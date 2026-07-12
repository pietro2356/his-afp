import { ChangeDetectionStrategy, Component, effect, inject, input, untracked } from '@angular/core';
import { GestioneRisorse } from '../../core/Risorse/gestione-risorse';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { DatePicker } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Fieldset } from 'primeng/fieldset';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { PatientAdmission, PatientSearchResult } from '../../core/Pazienti/Pazienti.model';

@Component({
  selector: 'his-accettazione-pz',
  imports: [
    InputText,
    ReactiveFormsModule,
    Button,
    Message,
    DatePicker,
    SelectModule,
    Textarea,
    Fieldset,
  ],
  templateUrl: './accettazione-pz.html',
  styleUrl: './accettazione-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazionePz {
  gestioneRisorse = inject(GestioneRisorse);
  patientManager = inject(PatientManager);

  pazienteIngresso = input<PatientSearchResult | null>(null);

  submitted = false;
  readonly maxDate = new Date();

  constructor() {
    effect(() => {
      const paziente = this.pazienteIngresso();
      untracked(() => {
        const anagrafica = this.paziente.get('anagrafica');
        if (paziente) {
          this.paziente.patchValue({
            anagrafica: {
              nome: paziente.nome,
              cognome: paziente.cognome,
              dataNascita: paziente.data_nascita
                ? (new Date(paziente.data_nascita) as unknown as string)
                : null,
              codiceFiscale: paziente.codice_fiscale,
              sesso: paziente.sex,
            },
          });
          anagrafica?.markAsPristine();
        } else {
          anagrafica?.reset();
        }
      });
    });
  }
  readonly sexOption = [
    {
      code: 'M',
      desc: 'Maschio',
    },
    {
      code: 'F',
      desc: 'Femmina',
    },
  ];

  readonly #fb = inject(FormBuilder);
  paziente = this.#fb.group({
    anagrafica: this.#fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      codiceFiscale: [
        '',
        [Validators.required, Validators.pattern('[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]')],
        // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
      ],
      sesso: ['', [Validators.required]],
    }),
    sanitaria: this.#fb.group({
      patologia: ['', [Validators.required]],
      codiceColore: ['', [Validators.required]],
      modArrivo: ['', [Validators.required]],
      noteTriage: ['', [Validators.required, Validators.maxLength(500)]],
    }),
  });

  checkFormControl(control: string) {
    const fc = this.paziente.get(control);
    // nome.invalid && (nome.touched || nome.dirty)
    return fc?.invalid && (fc.touched || fc.dirty);
  }
  checkFormControlError(control: string, err: string) {
    const fc = this.paziente.get(control);

    if (fc && fc.hasError(err)) {
      return fc.getError(err);
    } else {
      return null;
    }
  }
  onSubmit() {
    this.submitted = true;

    if (this.paziente.valid) {
      this.patientManager.admitPatient(this.paziente.value as PatientAdmission);
    } else {
      this.paziente.markAllAsTouched();
    }
  }
}
