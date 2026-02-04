import { Component, signal } from '@angular/core';
import { Paziente } from '../models/Paziente.model';
import { CardPz } from '../card-pz/card-pz';

@Component({
  selector: 'his-elenco-pz',
  imports: [CardPz],
  templateUrl: './elenco-pz.html',
  styleUrl: './elenco-pz.scss',
})
export class ElencoPz {
  listaPz = signal<Paziente[]>([
    {
      braccialetto: 'PZ254',
      codiceColore: 'ROSSO',
      cognome: 'Rocchio',
      eta: 25,
      id: '23',
      nome: 'Pietro',
      note: "Difficoltà respiratoria con dolore mandibolare irradiato all'arto sup. sx. di 9",
      patologia: 'C19',
      oraArrivo: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      braccialetto: 'DF090',
      codiceColore: 'VERDE',
      cognome: 'Brazorf',
      eta: 25,
      id: '9',
      nome: 'Ajeje',
      note: 'Non ha il biglietto del bus e non sa dove si trova',
      patologia: 'C19',
      oraArrivo: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      braccialetto: 'NB342',
      codiceColore: 'ARANCIONE',
      cognome: 'Winky',
      eta: 25,
      id: '8',
      nome: 'Tinky',
      note: 'Dolore addominale diffuso da 3 giorni con vomito e febbre alta',
      patologia: 'C01',
      oraArrivo: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);
  listaNomi = signal<string[]>(['Pietro', 'Gian', 'Lucio']);
}
