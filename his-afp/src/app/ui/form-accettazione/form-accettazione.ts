import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlexColP } from '../../core/directive/flex-col-p';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'his-form-accettazione',
  imports: [FlexColP, ReactiveFormsModule, InputTextModule],
  templateUrl: './form-accettazione.html',
  styleUrl: './form-accettazione.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccettazione {
  nome = new FormControl('');
}
