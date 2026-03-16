import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  paziente = new FormGroup<IFormAccettazione>({
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    address: new FormGroup({
      via: new FormControl(''),
      civico: new FormControl(0),
      comune: new FormControl(''),
      provincia: new FormControl(''),
    }),
  });

  submitForm() {
    console.info('Form inviata!', this.paziente.value);
  }
}
