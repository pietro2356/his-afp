import { computed, inject, Injectable, signal } from '@angular/core';
import { Admission } from '../../models/admission.model';
import { MOCK_ADMISSIONS } from '../../../features/dashboard/dashboard.mock';
import { HttpCoreService } from '../http-core/http-core.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionsService {
  readonly #httpCore = inject(HttpCoreService);
  readonly #admissions = signal<Admission[]>([]);
  readonly admissions = this.#admissions.asReadonly();

  readonly activeCounter = computed(() => this.#admissions().length);

  constructor() {
    //this.loadMockData();
    this.loadAdmissions();
  }

  public dischargePatient(pzID: number) {
    this.#admissions.update((currentList) => currentList.filter((adm) => adm.id !== pzID));
  }

  private loadMockData() {
    this.#admissions.set(MOCK_ADMISSIONS);
  }

  private loadAdmissions() {
    this.#httpCore
      .get('http://localhost:3000/admissions')
      .pipe(
        tap((res: any) => {
          const rawAdmission = res.data || [];
          const domainList = rawAdmission.map((dto: any) => this.mapToDomanin(dto));
          this.#admissions.set(domainList);
        }),
      )
      .subscribe();
  }

  private calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  private mapToDomanin(dto: any): Admission {
    return {
      id: dto.id,
      patientName: dto.nome,
      patientSurname: dto.cognome,
      braccialetto: dto.braccialetto,
      age: this.calculateAge(dto.dataNascita),
      triageColor: dto.coloreCode,
      triageNote: dto.noteTriage,
      arrivalTime: dto.dataOraIngresso,
      patologiaCode: dto.patologiaCode,
    };
  }
}
