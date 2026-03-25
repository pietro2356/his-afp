import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {PazienteDTO} from '../../core/Pazienti/Pazienti.model';
import {APIResponse} from '../../core/models/APIResponse.model';
import {formatDate} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {Fieldset} from 'primeng/fieldset';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {GestioneRisorse} from '../../core/Risorse/gestione-risorse';
import {Button} from 'primeng/button';

@Component({
  selector: 'his-modifica-pz',
  imports: [
    DatePicker,
    Fieldset,
    InputText,
    Message,
    ReactiveFormsModule,
    Select,
    Textarea,
    Button,
  ],
  templateUrl: './modifica-pz.html',
  styleUrl: './modifica-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModificaPz {
  readonly fb = inject(FormBuilder);
  readonly gestioneRisorse = inject(GestioneRisorse);
  patientId = input<string>();
  canEditAnagrafica = signal<boolean>(false);
  patient = httpResource<APIResponse<PazienteDTO>>(
    () => `http://localhost:3000/admissions/${this.patientId()}`,
  );
  // All'interno del componente
  readonly admissionForm = this.fb.group({
    anagrafica: this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      codiceFiscale: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i)],
      ],
      sesso: ['', [Validators.required]],
    }),
    sanitaria: this.fb.group({
      patologia: ['', [Validators.required]],
      codiceColore: ['', [Validators.required]],
      modArrivo: ['', [Validators.required]],
      noteTriage: ['', [Validators.required, Validators.maxLength(500)]],
    }),
  });

  constructor() {
    effect(() => {
      const val = this.patient.value();
      if (val?.data) {
        const data = val?.data;
        this.admissionForm.patchValue({
          anagrafica: {
            nome: data?.nome ?? '',
            cognome: data?.cognome ?? '',
            dataNascita: formatDate(data?.dataNascita ?? '', 'dd/MM/yyyy', 'en'),
            codiceFiscale: data?.codiceFiscale ?? '',
            sesso: data?.sex ?? '',
          },
          sanitaria: {
            patologia: data?.patologiaCode ?? '',
            codiceColore: data?.coloreCode ?? '',
            modArrivo: data?.modalitaArrivoCode ?? '',
            noteTriage: data?.noteTriage ?? '',
          },
        });
        this.admissionForm.get('anagrafica')?.disable();
      }
    });
  }

  toggleEditAnagrafica() {
    this.canEditAnagrafica()
      ? this.admissionForm.get('anagrafica')?.disable()
      : this.admissionForm.get('anagrafica')?.enable();

    this.canEditAnagrafica.set(!this.canEditAnagrafica());
  }

  checkFormFieldValidity(field: string) {
    const ff = this.admissionForm.get(field);
    return ff?.invalid && (ff.touched || ff.dirty);
  }

  getFormFieldError(field: string, errCode: string): boolean {
    const ff = this.admissionForm.get(field);
    return ff?.hasError(errCode) ?? false;
  }
}
