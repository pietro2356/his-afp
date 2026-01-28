import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';

interface Paziente {
  id: string;
  nome: string;
  cognome: string;
  braccialetto: string;
  eta: number;
  codiceColore: string;
  note: string;
  patologia: string;
  oraArrivo: string;
}

@Component({
  selector: 'his-card-pz',
  imports: [CardModule, DatePipe],
  templateUrl: './card-pz.html',
  styleUrl: './card-pz.scss',
})
export class CardPz {
  nome: string = 'Pietro';
  paziente = signal<Paziente>({
    braccialetto: 'PZ254',
    codiceColore: 'ROSSO',
    cognome: 'Rocchio',
    eta: 25,
    id: '23',
    nome: 'Pietro',
    note: 'Trauma lieve alla caviglia',
    patologia: 'C19',
    oraArrivo: new Date(Date.now() - 7200000).toISOString(),
  });

  cambiaNome() {
    this.nome = 'Gian';

    // this.paziente = "Lucio";
    //this.paziente.set('Lucio');
  }
}
