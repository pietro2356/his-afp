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
  colori = ['BIANCO', 'VERDE', 'AZZURRO', 'ARANCIONE', 'ROSSO'];

  paziente = input.required<Paziente>();

  setStatusColor() {
    switch (this.paziente().codiceColore) {
      case 'ROSSO':
        return 'border-l-8 border-red-600';
      case 'ARANCIONE':
        return 'border-l-8 border-orange-400';
      case 'AZZURRO':
        return 'border-l-8 border-blue-500';
      case 'VERDE':
        return 'border-l-8 border-green-600';
      case 'BIANCO':
        return 'border-l-8 border-gray-400';
      default:
        return '';
    }
  }

  incrementaStato() {
    const currentIndex = this.colori.indexOf(this.paziente().codiceColore);
    if (currentIndex < this.colori.length - 1) {
      this.paziente().codiceColore = this.colori[currentIndex + 1];
    }
  }

  decrementaStato() {
    const currentIndex = this.colori.indexOf(this.paziente().codiceColore);
    if (currentIndex > 0) {
      this.paziente().codiceColore = this.colori[currentIndex - 1];
    }
  }
}
