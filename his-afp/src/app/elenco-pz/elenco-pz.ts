import { Component, signal } from '@angular/core';
import { CardPz } from '../card-pz/card-pz';
import { Paziente } from '../models/Paziente.model';

@Component({
  selector: 'his-elenco-pz',
  imports: [CardPz],
  templateUrl: './elenco-pz.html',
  styleUrl: './elenco-pz.scss',
})
export class ElencoPz {
  listaPz = signal<Paziente[]>([]);
}
