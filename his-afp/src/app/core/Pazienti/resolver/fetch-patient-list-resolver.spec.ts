import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { fetchPatientListResolver } from './fetch-patient-list-resolver';

describe('fetchPatientListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchPatientListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
