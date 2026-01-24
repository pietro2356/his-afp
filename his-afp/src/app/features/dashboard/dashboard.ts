import {Component, inject} from '@angular/core';
import {PatientCard} from '../../ui/patient-card/patient-card';
import {AdmissionsService} from '../../core/services/admissions/admissions.service';

@Component({
  selector: 'app-dashboard',
  imports: [PatientCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // 1. INJECTION: Chiediamo ad Angular l'istanza del servizio
  readonly #admissionsService = inject(AdmissionsService);

  // 2. EXPOSE: Esponiamo i segnali del servizio al template
  // Non serve ridefinire signal locali! Colleghiamo direttamente.
  activeCount = this.#admissionsService.activeCounter;
  admissions = this.#admissionsService.admissions;

  removePatient(admissionId: number) {
    this.#admissionsService.dischargePatient(admissionId);
  }
}
