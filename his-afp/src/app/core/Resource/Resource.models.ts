export type AdmissionStatus = 'ATT' | 'VIS' | 'OBI' | 'RIC' | 'DIM';
export type UserRole = 'DOC' | 'INF' | 'AMM';

export const AdmissionStatusLabel: Record<AdmissionStatus, string> = {
  ATT: 'In Attesa',
  VIS: 'In Visita',
  OBI: 'Osservazione',
  RIC: 'Ricoverato',
  DIM: 'Dimesso',
};

export interface TriageColor {
  code: string;
  displayName: string;
  priority: number;
  hexValue: string;
}

export interface Pathology {
  code: string;
  description: string;
}

export interface ArrivalMode {
  code: string;
  description: string;
}
