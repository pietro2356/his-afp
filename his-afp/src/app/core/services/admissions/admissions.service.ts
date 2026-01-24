import { computed, Injectable, signal } from '@angular/core';
import { Admission } from '../../models/admission.model';
import { MOCK_ADMISSIONS } from '../../../features/dashboard/dashboard.mock';

@Injectable({
  providedIn: 'root',
})
export class AdmissionsService {
  readonly #admissions = signal<Admission[]>([]);
  readonly admissions = this.#admissions.asReadonly();

  readonly activeCounter = computed(() => this.#admissions().length);

  constructor() {
    this.loadMockData();
  }

  public dischargePatient(pzID: number) {
    this.#admissions.update((currentList) => currentList.filter((adm) => adm.id !== pzID));
  }

  private loadMockData() {
    this.#admissions.set(MOCK_ADMISSIONS);
  }
}
