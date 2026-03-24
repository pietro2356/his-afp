import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GestioneRisorse } from '../../core/Risorse/gestione-risorse';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { Fieldset } from 'primeng/fieldset';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { PatientAdmission } from '../../core/Pazienti/Pazienti.model';

@Component({
  selector: 'his-accettazione-pz',
  imports: [
    InputText,
    ReactiveFormsModule,
    Message,
    Select,
    DatePicker,
    Button,
    Textarea,
    Fieldset,
  ],
  templateUrl: './accettazione-pz.html',
  styleUrl: './accettazione-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazionePz {
  fb = inject(FormBuilder);
  gestioneRisorse = inject(GestioneRisorse);
  pzManager = inject(PatientManager);

  paziente = this.fb.group({
    anagrafica: this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      codiceFiscale: [
        '',
        [Validators.required, Validators.minLength(16), Validators.maxLength(16)],
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

  checkFormFieldValidity(field: string) {
    const ff = this.paziente.get(field);
    return ff?.invalid && (ff.touched || ff.dirty);
  }

  getFormFieldError(field: string, errCode: string): boolean {
    const ff = this.paziente.get(field);
    return ff?.hasError(errCode) ?? false;
  }
  submitForm() {
    if (this.paziente.valid) {
      console.log(this.paziente.value);
      this.pzManager.admitPatient(this.paziente.value as PatientAdmission);
    } else {
      this.paziente.markAllAsTouched();
    }
  }
}
