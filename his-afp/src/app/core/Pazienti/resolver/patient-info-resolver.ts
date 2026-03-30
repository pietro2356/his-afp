import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../models/APIResponse.model';
import { PazienteDTO } from '../Pazienti.model';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

export const patientInfoResolver: ResolveFn<Observable<APIResponse<PazienteDTO> | undefined>> = (
  route,
) => {
  const http = inject(HttpClient);
  const patientId = route.paramMap.get('patientId')!;

  return http
    .get<APIResponse<PazienteDTO> | undefined>(`${environment.apiUrl}/admissions/${patientId}`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching patient info:', error);
        return of(undefined);
      }),
    );
};
