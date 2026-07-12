import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/APIResponse.model';
import { environment } from '../../../environments/environment';
import { PazienteDimesso } from './monitor-dimessi.model';

@Injectable({
  providedIn: 'root',
})
export class MonitorDimessiService {
  readonly #http = inject(HttpClient);
  readonly #dimessi = signal<PazienteDimesso[]>([]);
  dimessi = this.#dimessi.asReadonly();

  public fetchDimessi() {
    this.#http
      .get<APIResponse<PazienteDimesso[]>>(`${environment.apiUrl}/admissions/reports/discharged`)
      .subscribe({
        next: (res) => {
          const pazienti = res.data ?? [];
          this.#dimessi.set(pazienti.filter((p) => p.stato === 'DIM'));
        },
        error: (err) => {
          console.error("Errore durante il fetch dei pazienti dimessi:", err);
        },
      });
  }
}
