import { Component, computed, signal } from '@angular/core';
import { Admission } from '../../core/models/admission.model';
import { MOCK_ADMISSIONS } from './dashboard.mock';
import { PatientCard } from '../../ui/patient-card/patient-card';

@Component({
  selector: 'app-dashboard',
  imports: [PatientCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // Lo Stato locale gestito con Signal
  // Inizializzato con i dati mock
  admissions = signal<Admission[]>(MOCK_ADMISSIONS);

  // Errato: non si aggiorna quando cambia admissions
  // Perché è una Signal "statica" inizializzata una volta sola
  // activeCount = signal<number>(this.admissions().length);

  // Corretto: si aggiorna automaticamente quando cambia admissions
  // Perché computed "ascolta" le Signal usate al suo interno
  activeCount = computed(() => this.admissions().length);

  removePatient(admissionId: number) {
    this.admissions.update((currentList) => currentList.filter((adm) => adm.id !== admissionId));
  }
}
