export interface Paziente {
  id: string;
  nome: string;
  cognome: string;
  braccialetto: string;
  eta: number;
  codiceColore: string;
  note: string;
  patologia: string;
}

export type AdmissionStatus = 'ATT' | 'VIS' | 'OBI' | 'RIC' | 'DIM';
export type UserRole = 'DOC' | 'INF' | 'AMM';

export const AdmissionStatusLabel: Record<AdmissionStatus, string> = {
  ATT: 'In Attesa',
  VIS: 'In Visita',
  OBI: 'Osservazione',
  RIC: 'Ricoverato',
  DIM: 'Dimesso',
};

export interface PazienteDTO {
  id: number;
  braccialetto: string;
  dataOraIngresso: string; // ISO String
  stato: AdmissionStatus;
  noteTriage: string | null;

  // Dati Anagrafici
  nome: string;
  cognome: string;
  dataNascita: string;
  codiceFiscale: string;

  // Dati Clinici (Flattened)
  patologiaCode: string;
  patologiaDescrizione: string;
  coloreCode: string;
  coloreHex: string;
  coloreNome: string;
  modalitaArrivoCode: string;
  modalitaArrivoDescrizione: string;
}
