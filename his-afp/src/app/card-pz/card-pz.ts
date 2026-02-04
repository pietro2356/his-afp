import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { Paziente } from '../models/Paziente.model';

@Component({
  selector: 'his-card-pz',
  imports: [CardModule, Button],
  templateUrl: './card-pz.html',
  styleUrl: './card-pz.scss',
})
export class CardPz {
  nome: string = 'Pietro';

  paziente = input.required<Paziente>();

  // paziente = signal<Paziente>({
  //   braccialetto: 'PZ254',
  //   codiceColore: 'ROSSO',
  //   cognome: 'Rocchio',
  //   eta: 25,
  //   id: '23',
  //   nome: 'Pietro',
  //   note: "Difficoltà respiratoria con dolore mandibolare irradiato all'arto sup. sx. di 9",
  //   patologia: 'C19',
  //   oraArrivo: new Date(Date.now() - 7200000).toISOString(),
  // });

  cambiaNome() {
    this.nome = 'Gian';

    // this.paziente = "Lucio";
    //this.paziente.set('Lucio');
  }
}
