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
      codiceColore: 'ARANCIONE',
      cognome: 'Mr.',
      eta: 25,
      id: '23',
      nome: 'Freeman',
      note: 'Dolore mostruoso alla gamba destra, dopo discussione con CP3624',
      patologia: 'C01',
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
      patologia: 'C05',
      oraArrivo: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      braccialetto: 'NB342',
      codiceColore: 'ROSSO',
      cognome: 'Skywalker',
      eta: 25,
      id: '8',
      nome: 'Luke',
      note: 'Amputazione mano destra a seguito di uno scontro con Lord Vader',
      patologia: 'C01',
      oraArrivo: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);
  listaNomi = signal<string[]>(['Pietro', 'Gian', 'Lucio']);
}
