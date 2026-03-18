import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  // nome = new FormControl('', [Validators.required, Validators.minLength(4)]);

  user = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cognome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    dataDiNascita: new FormControl('', [Validators.required]),
  });

  isFieldInvalid(fc: string): boolean {
    this.checkFCExistence(fc);
    const control = this.user.get(fc);
    if (!control) return false;
    return control && control.invalid && (control.touched || control.dirty);
  }

  getFieldErrors(fc: string) {
    this.checkFCExistence(fc);
    return this.user.get(fc)?.errors;
  }

  getFieldValue(fc: string) {
    this.checkFCExistence(fc);
    return this.user.get(fc)?.value;
  }

  getField(fc: string) {
    this.checkFCExistence(fc);
    return this.user.get(fc);
  }

  private checkFCExistence(fc: string): void {
    if (!this.user.contains(fc)) {
      console.error(`Il FormGroup non contiene il FormControl con nome "${fc}"`);
      throw new Error(`Il FormGroup non contiene il FormControl con nome "${fc}"`);
    }
  }
}
