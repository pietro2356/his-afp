import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldTree, FormField, ValidationError } from '@angular/forms/signals';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FlexColP } from '../../core/directive/flex-col-p';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'his-form-input',
  imports: [InputText, Message, FormField, FlexColP, DatePickerModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInput {
  scopo = input.required<string>();
  type = input.required<string>();
  checkFn = input.required<Function>();
  formField = input.required<FieldTree<string, string>>();
  formFieldErrors = input.required<ValidationError[]>();
}
