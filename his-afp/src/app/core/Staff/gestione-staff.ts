import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/APIResponse.model';
import { environment } from '../../../environments/environment';
import { CreateStaffRequest, EditRoleRequest, Staff, StaffDTO, UsernameCheck } from './staff.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestioneStaff {
  readonly #http = inject(HttpClient);
  readonly #listaStaff = signal<Staff[]>([]);
  listaStaff = this.#listaStaff.asReadonly();

  public fetchStaff() {
    this.#http
      .get<APIResponse<StaffDTO[]>>(`${environment.apiUrl}/users`)
      .subscribe({
        next: (res) => {
          this.#listaStaff.set(
            res.data.map((s) => ({
              id: s.id,
              username: s.username,
              role: s.role,
              isActive: s.isActive,
            })),
          );
        },
        error: (err) => {
          console.error("Errore durante il fetch dello staff:", err);
        },
      });
  }

  public checkUsernameAvailability(username: string): Observable<APIResponse<UsernameCheck>> {
    return this.#http.get<APIResponse<UsernameCheck>>(
      `${environment.apiUrl}/users/check/${encodeURIComponent(username)}`,
    );
  }

  public createStaff(req: CreateStaffRequest): Observable<APIResponse<StaffDTO>> {
    return this.#http.post<APIResponse<StaffDTO>>(`${environment.apiUrl}/users`, req);
  }

  public editRole(id: number, req: EditRoleRequest): Observable<APIResponse<StaffDTO>> {
    return this.#http.patch<APIResponse<StaffDTO>>(
      `${environment.apiUrl}/users/${id}/editrole`,
      req,
    );
  }

  public deactivate(id: number) {
    this.#http
      .patch<APIResponse<unknown>>(`${environment.apiUrl}/users/${id}/deactivate`, {})
      .subscribe({
        next: () => this.fetchStaff(),
        error: (err) => console.error("Errore durante la disattivazione dell'operatore:", err),
      });
  }

  public activate(id: number) {
    this.#http
      .patch<APIResponse<unknown>>(`${environment.apiUrl}/users/${id}/activate`, {})
      .subscribe({
        next: () => this.fetchStaff(),
        error: (err) => console.error("Errore durante l'attivazione dell'operatore:", err),
      });
  }
}
