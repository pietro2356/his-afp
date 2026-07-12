import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PatientManager } from './patient-manager';
import { APIResponse } from '../models/APIResponse.model';
import { PazienteDTO } from './Pazienti.model';

describe('PatientManager', () => {
  let service: PatientManager;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(PatientManager);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should keep the filtered list in sync after fetching patients', () => {
    const response: APIResponse<PazienteDTO[]> = {
      status: 'success',
      data: [
        {
          id: 1,
          braccialetto: 'BR-001',
          dataOraIngresso: '2026-06-27T10:00:00Z',
          stato: 'IN_CORSO',
          noteTriage: 'Test note',
          patologiaCode: 'CARDIACO',
          nome: 'Anna',
          cognome: 'Rossi',
          dataNascita: '1990-01-01',
          sex: 'F',
          codiceFiscale: 'RSSANN90A01A000A',
          patologiaDescrizione: 'Cardiaco',
          coloreCode: 'VERDE',
          coloreHex: '#00ff00',
          coloreNome: 'Verde',
          modalitaArrivoCode: 'AUTO',
          modalitaArrivoDescrizione: 'Auto privata',
          indirizzoVia: 'Via Roma',
          indirizzoCivico: '1',
          comune: 'Rovereto',
          provincia: 'TN',
        },
      ],
    };

    service.filterByName('anna');
    service.fetchPazienti();

    const req = httpMock.expectOne('/api/admissions');
    req.flush(response);

    expect(service.listaPZ().map((p) => p.nome)).toEqual(['Anna']);
  });
});
