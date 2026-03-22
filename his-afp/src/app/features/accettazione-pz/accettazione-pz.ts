import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GestioneRisorse } from '../../core/Risorse/gestione-risorse';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';

@Component({
  selector: 'his-accettazione-pz',
  imports: [InputText, ReactiveFormsModule, Message, Select, DatePicker, Button],
  templateUrl: './accettazione-pz.html',
  styleUrl: './accettazione-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazionePz {
  fb = inject(FormBuilder);
  gestioneRisorse = inject(GestioneRisorse);

  paziente = this.fb.group({
    anagrafica: this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
    }),
    sanitari: this.fb.group({
      codiceColore: ['', [Validators.required]],
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
    } else {
      this.paziente.markAllAsTouched();
    }
  }
}
