import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexColP } from '../../core/directive/flex-col-p';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Message } from 'primeng/message';

@Component({
  selector: 'his-form-accettazione',
  imports: [FlexColP, ReactiveFormsModule, InputTextModule, Button, InputNumber, Message],
  templateUrl: './form-accettazione.html',
  styleUrl: './form-accettazione.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccettazione {
  isSubmitted = signal<boolean>(false);
  readonly #formBuilder = inject(FormBuilder);
  paziente = this.#formBuilder.group({
    nome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    cognome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    address: this.#formBuilder.group({
      via: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      civico: ['', Validators.required, Validators.min(0)],
      comune: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      provincia: ['', Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    }),
  });

  checkFCValidity(fc: string): boolean {
    const fcStatus = this.paziente.get(fc);
    if (!fcStatus) return false;

    return fcStatus.invalid && (fcStatus.dirty || fcStatus.touched || this.isSubmitted());
  }

  submitForm() {
    console.info('Form inviata!', this.paziente.value);
    this.isSubmitted.set(true);
  }
}
