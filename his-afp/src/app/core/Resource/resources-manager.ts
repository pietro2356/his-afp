import { inject, Injectable, signal } from '@angular/core';
import { ArrivalMode, Pathology, TriageColor } from './Resource.models';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/APIResponse.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResourcesManager {
  readonly #http = inject(HttpClient);
  readonly #triageColors = signal<TriageColor[]>([]);
  triageColors = this.#triageColors.asReadonly();

  readonly #pathologies = signal<Pathology[]>([]);
  pathologies = this.#pathologies.asReadonly();

  readonly #arrivalModes = signal<ArrivalMode[]>([]);
  arrivalModes = this.#arrivalModes.asReadonly();

  public fetchResources() {
    this.fetchTriageColors();
    this.fetchPathologies();
    this.fetchArrivalModes();
  }

  private fetchTriageColors() {
    this.#http
      .get<APIResponse<TriageColor[]>>(`${environment.apiUrl}/resources/triage-colors`)
      .subscribe({
        next: (response) => {
          this.#triageColors.set(response.data.sort((a, b) => a.priority - b.priority));
        },
        error: (error) => {
          console.log('Error fetching triage colors:', error);
        },
      });
  }

  private fetchPathologies() {
    this.#http
      .get<APIResponse<Pathology[]>>(`${environment.apiUrl}/resources/pathologies`)
      .subscribe({
        next: (response) => {
          this.#pathologies.set(response.data);
        },
        error: (error) => {
          console.log('Error fetching pathologies:', error);
        },
      });
  }

  private fetchArrivalModes() {
    this.#http
      .get<APIResponse<ArrivalMode[]>>(`${environment.apiUrl}/resources/arrival-modes`)
      .subscribe({
        next: (response) => {
          this.#arrivalModes.set(response.data);
        },
        error: (error) => {
          console.log('Error fetching arrival modes:', error);
        },
      });
  }
}
