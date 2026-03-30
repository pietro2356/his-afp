import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PatientManager } from '../patient-manager';

export const fetchPatientListResolver: ResolveFn<void> = (route, state) => {
  inject(PatientManager).fetchPazienti();
};
