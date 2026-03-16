import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlexColP } from '../../core/directive/flex-col-p';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';

interface IFormAccettazione {
  nome: AbstractControl;
  cognome: AbstractControl;
  address: AbstractControl;
}

@Component({
  selector: 'his-form-accettazione',
  imports: [FlexColP, ReactiveFormsModule, InputTextModule, Button, InputNumber],
  templateUrl: './form-accettazione.html',
  styleUrl: './form-accettazione.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccettazione {
  readonly #formBuilder = inject(FormBuilder);

  paziente = this.#formBuilder.group({
    nome: [''],
    cognome: [''],
    address: this.#formBuilder.group({
      via: [''],
      civico: [''],
      comune: [''],
      provincia: [''],
    }),
  });

  submitForm() {
    console.info('Form inviata!', this.paziente.value);
  }
}
