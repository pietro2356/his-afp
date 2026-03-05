import { Component, signal } from '@angular/core';
import { Paziente } from '../card-pz/card-pz';

@Component({
  selector: 'his-lista-pz',
  imports: [],
  templateUrl: './lista.pz.html',
  styleUrl: './lista.pz.scss',
})
export class ListaPz {
  listaPz = signal<Paziente[]>([]);
}
