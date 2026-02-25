import { Component, computed, inject, model } from '@angular/core';
import { CardPz } from '../card-pz/card-pz';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { HealthStatus } from '../ui/system-healt-status/health-status.component';
import { Paziente } from '../core/models/Paziente';
import { PatientManager } from '../core/Patients/patient-manager';

@Component({
  selector: 'his-lista-pz',
  imports: [InputTextModule, FormsModule, ButtonModule, CardPz, TagModule, HealthStatus],
  templateUrl: './lista-pz.html',
  styleUrl: './lista-pz.scss',
})
export class ListaPz {
  nomePaziente = model<string>('');
  #patientManager = inject(PatientManager);
  listaPz = this.#patientManager.listaPZ;
  filteredList = computed(() => {
    return this.listaPz().filter((pz: Paziente) =>
      pz.nome.toLowerCase().includes(this.nomePaziente().toLowerCase()),
    );
  });

  ngOnInit() {
    this.#patientManager.fetchListaPazienti();
  }

  editNomePaziente(nomePZ: string) {
    this.nomePaziente.set(nomePZ);
  }
}
