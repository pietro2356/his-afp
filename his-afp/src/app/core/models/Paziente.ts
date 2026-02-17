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

export interface Admission {
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

export const mapAdmissionToPaziente = (admission: Admission): Paziente => ({
  id: admission.id.toString(),
  nome: admission.nome,
  cognome: admission.cognome,
  braccialetto: admission.braccialetto,
  eta: calculateAge(admission.dataNascita),
  codiceColore: admission.coloreCode.toUpperCase(),
  note: admission.noteTriage || '',
  patologia: admission.patologiaDescrizione,
});

const calculateAge = (dataNascita: string): number => {
  const birthDate = new Date(dataNascita);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
