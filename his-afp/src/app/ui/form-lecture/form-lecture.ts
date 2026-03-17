import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';
import { Message } from 'primeng/message';

@Component({
  selector: 'his-form-lecture',
  imports: [ReactiveFormsModule, InputText, Tag, Message],
  templateUrl: './form-lecture.html',
  styleUrl: './form-lecture.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLecture {
  nome = new FormControl('', [Validators.required, Validators.minLength(4)]);

  isFieldInvalid(): boolean {
    const control = this.nome;
    return control && control.invalid && (control.touched || control.dirty);
  }
}
