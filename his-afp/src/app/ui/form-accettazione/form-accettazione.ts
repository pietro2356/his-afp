import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexColP } from '../../core/directive/flex-col-p';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';

interface IFormAccettazione {
  nome: AbstractControl;
  cognome: AbstractControl;
}

@Component({
  selector: 'his-form-accettazione',
  imports: [FlexColP, ReactiveFormsModule, InputTextModule, Button],
  templateUrl: './form-accettazione.html',
  styleUrl: './form-accettazione.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccettazione {
  //nome = new FormControl('');

  paziente = new FormGroup<IFormAccettazione>({
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
  });

  submitForm() {
    console.info('Form inviata!', this.paziente.value);
  }
}
