import { Admission } from '../../core/models/admission.model';

export const MOCK_ADMISSIONS: Admission[] = [
  {
    id: 101,
    patientName: 'Mario',
    patientSurname: 'Rossi',
    age: 74,
    triageColor: 'ROSSO',
    triageNote: 'Dolore toracico acuto, sospetto infarto.',
    arrivalTime: new Date().toISOString(),
  },
  {
    id: 102,
    patientName: 'Luigi',
    patientSurname: 'Verdi',
    age: 22,
    triageColor: 'VERDE',
    triageNote: 'Distorsione caviglia dx giocando a calcetto.',
    arrivalTime: new Date(Date.now() - 3600000).toISOString(), // 1 ora fa
  },
  {
    id: 103,
    patientName: 'Anna',
    patientSurname: 'Bianchi',
    age: 8,
    triageColor: 'GIALLO',
    triageNote: 'Febbre alta (39.5) e convulsioni.',
    arrivalTime: new Date(Date.now() - 1800000).toISOString(), // 30 min fa
  },
];
