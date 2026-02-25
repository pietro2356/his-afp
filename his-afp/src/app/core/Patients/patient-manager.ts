import { inject, Injectable, signal } from '@angular/core';
import { Paziente, PazienteDTO } from '../models/Paziente';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/HttpResponse';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientManager {
  #http = inject(HttpClient);
  #listaPZ = signal<Paziente[]>([]);
  listaPZ = this.#listaPZ.asReadonly();

  /**
   * Fetches the list of patients from the backend API, maps the response to the Paziente model, and updates the signal with the new data.
   * If there's an error during the fetch, it logs the error and sets the signal to an empty array.
   */
  public fetchListaPazienti() {
    console.log('Fetching patient list...');
    this.#http
      .get<APIResponse<PazienteDTO[]>>('http://localhost:3000/admissions')
      .pipe(map((res) => res.data.map((dto) => this.mapDTOToPaziente(dto))))
      .subscribe({
        next: (data) => {
          console.log('Patient list fetched successfully:', data);
          this.#listaPZ.set(data);
        },
        error: (err) => {
          console.error('Error fetching patient list:', err);
          this.#listaPZ.set([]);
        },
      });
  }

  /**
   * Maps a PazienteDTO object from the backend API to a Paziente model used in the frontend application.
   * @param dto The PazienteDTO object received from the backend API.
   * @return A Paziente object with the relevant fields mapped and transformed as needed.
   * @private
   */
  private mapDTOToPaziente(dto: PazienteDTO): Paziente {
    return {
      id: dto.id.toString(),
      nome: dto.nome,
      cognome: dto.cognome,
      braccialetto: dto.braccialetto,
      eta: this.calculateAge(dto.dataNascita),
      codiceColore: dto.coloreCode.toUpperCase(),
      note: dto.noteTriage || '',
      patologia: dto.patologiaDescrizione,
    };
  }

  /**
   * Calculates the age of a patient based on their date of birth.
   * @param dataNascita The date of birth of the patient in ISO string format (YYYY-MM-DD).
   * @return The calculated age of the patient as a number.
   * @private
   */
  private calculateAge(dataNascita: string): number {
    const birthDate = new Date(dataNascita);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
