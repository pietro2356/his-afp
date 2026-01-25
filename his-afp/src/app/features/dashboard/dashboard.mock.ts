import { Admission } from '../../core/models/admission.model';

export const MOCK_ADMISSIONS: Admission[] = [
  {
    id: 101,
    patientName: 'Mario',
    patientSurname: 'Rossi',
    braccialetto: 'A12345',
    age: 74,
    triageColor: 'ROSSO',
    triageNote: 'Dolore toracico acuto, sospetto infarto.',
    arrivalTime: new Date().toISOString(),
    patologiaCode: 'C02',
  },
  {
    id: 102,
    patientName: 'Luigi',
    patientSurname: 'Verdi',
    braccialetto: 'B67890',
    age: 22,
    triageColor: 'VERDE',
    triageNote: 'Distorsione caviglia dx giocando a calcetto.',
    arrivalTime: new Date(Date.now() - 3600000).toISOString(), // 1 ora fa
    patologiaCode: 'C19',
  },
  {
    id: 103,
    patientName: 'Anna',
    patientSurname: 'Bianchi',
    braccialetto: 'C11223',
    age: 8,
    triageColor: 'ARANCIONE',
    triageNote: 'Febbre alta (39.5) e convulsioni.',
    arrivalTime: new Date(Date.now() - 1800000).toISOString(), // 30 min fa
    patologiaCode: 'C03',
  },
  {
    id: 104,
    patientName: 'Carla',
    patientSurname: 'Neri',
    braccialetto: 'C11223',
    age: 55,
    triageColor: 'AZZURRO',
    triageNote: 'Lieve taglio al dito, necessita punti di sutura.',
    arrivalTime: new Date(Date.now() - 7200000).toISOString(), // 2 ore fa
    patologiaCode: 'C11',
  },
  {
    id: 105,
    patientName: 'Paolo',
    patientSurname: 'Gialli',
    braccialetto: 'D44556',
    age: 40,
    triageColor: 'BIANCO',
    triageNote: 'Controllo pressione alta, nessun sintomo acuto.',
    arrivalTime: new Date(Date.now() - 5400000).toISOString(), // 1.5 ore fa
    patologiaCode: 'C12',
  },
];
