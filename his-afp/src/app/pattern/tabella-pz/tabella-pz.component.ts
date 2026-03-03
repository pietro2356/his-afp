import { Component, effect, inject, model } from '@angular/core';
import { CardPz } from '../../ui/card-pz/card-pz';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PatientManager } from '../../core/Pazienti/patient-manager';

@Component({
  selector: 'his-tabella-pz',
  imports: [InputTextModule, FormsModule, ButtonModule, CardPz, TagModule],
  templateUrl: './tabella-pz.component.html',
  styleUrl: './tabella-pz.component.scss',
})
export class TabellaPz {
  readonly PatientManager = inject(PatientManager);
  nomePaziente = model<string>('');
  listaPz = this.PatientManager.listaPZ;
  constructor() {
    effect(() => {
      this.PatientManager.filterByName(this.nomePaziente());
    });
  }

  editNomePaziente(nomePZ: string) {
    this.nomePaziente.set(nomePZ);
    this.PatientManager.filterByName(this.nomePaziente());
  }
}
