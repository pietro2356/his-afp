export interface Paziente {
  id: string; // id
  nome: string; // nome
  cognome: string; // cognome
  braccialetto: string; // braccialetto
  eta: number; // da calcolare con dataNascita
  codiceColore: string; // coloreCode
  note: string; // noteTriage
  patologia: string; // patologiaCode
}

export interface PazienteDTO {
  id: number;
  braccialetto: string;
  dataOraIngresso: string;
  stato: string;
  noteTriage: string;
  patologiaCode: string;
  nome: string;
  cognome: string;
  dataNascita: string;
  codiceFiscale: string;
  patologiaDescrizione: string;
  coloreCode: string;
  coloreHex: string;
  coloreNome: string;
  modalitaArrivoCode: string;
  modalitaArrivoDescrizione: string;
}

export interface PazienteCreateDTO {
  nome: string;
  cognome: string;
  dataNascita: string;
  codiceFiscale: string;
  sex: string;
  patologiaCode: string;
  codiceColore: string;
  modalitaArrivoCode: string;
  noteTriage: string;
}
