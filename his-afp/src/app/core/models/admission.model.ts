export type TriageColor = 'ROSSO' | 'ARANCIONE' | 'AZZURRO' | 'VERDE' | 'BIANCO';

export interface Admission {
  id: number;
  patientName: string;
  patientSurname: string;
  age: number; // Semplificato per ora
  triageColor: TriageColor;
  triageNote: string;
  arrivalTime: string; // ISO String
}
