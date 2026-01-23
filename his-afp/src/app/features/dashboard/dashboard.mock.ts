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
    triageColor: 'ARANCIONE',
    triageNote: 'Febbre alta (39.5) e convulsioni.',
    arrivalTime: new Date(Date.now() - 1800000).toISOString(), // 30 min fa
  },
  {
    id: 104,
    patientName: 'Carla',
    patientSurname: 'Neri',
    age: 55,
    triageColor: 'AZZURRO',
    triageNote: 'Lieve taglio al dito, necessita punti di sutura.',
    arrivalTime: new Date(Date.now() - 7200000).toISOString(), // 2 ore fa
  },
  {
    id: 105,
    patientName: 'Paolo',
    patientSurname: 'Gialli',
    age: 40,
    triageColor: 'BIANCO',
    triageNote: 'Controllo pressione alta, nessun sintomo acuto.',
    arrivalTime: new Date(Date.now() - 5400000).toISOString(), // 1.5 ore fa
  },
];
