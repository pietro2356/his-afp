import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GestioneRisorse } from '../../core/Risorse/gestione-risorse';
import { InputText } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Message } from 'primeng/message';

@Component({
  selector: 'his-accettazione-pz',
  imports: [InputText, ReactiveFormsModule, JsonPipe, Message],
  templateUrl: './accettazione-pz.html',
  styleUrl: './accettazione-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazionePz {
  gestioneRisorse = inject(GestioneRisorse);
  nome = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
  ]);

  checkFormFieldValidity(field: string) {
    return this.nome.invalid && (this.nome.touched || this.nome.dirty);
  }
}
