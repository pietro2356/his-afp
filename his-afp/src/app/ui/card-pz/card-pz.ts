import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { Paziente } from '../../core/Pazienti/Pazienti.model';
import { Router } from '@angular/router';
import { ColorBox } from '../color-box/color-box';

@Component({
  selector: 'his-card-pz',
  imports: [CardModule, Button, ColorBox],
  templateUrl: './card-pz.html',
  styleUrl: './card-pz.scss',
})
export class CardPz {
  paziente = input.required<Paziente>();
  borderTop = input.required<boolean>();
  colorCodeMode = input.required<'border' | 'box'>();
  readonly #router = inject(Router);

  public navigateToSchedaPaziente() {
    // this.#router.navigate(['/modifica-pz'], {
    //   queryParams: { id: this.paziente().id },
    // });
    this.#router.navigate([`/modifica-pz/${this.paziente().id}`], {
      queryParams: { patientId: +this.paziente().id + 2 },
    });
  }

  setSexIcon() {
    switch (this.paziente().sesso) {
      case 'M':
        return 'pi pi-android';
      case 'F':
        return 'pi pi-crown';
      default:
        return 'pi pi-asterisk';
    }
  }

  setBorder() {
    if (this.colorCodeMode() !== 'border') return '';
    return this.borderTop() ? 'border-t-8' : 'border-b-8';
  }

  setColoreDiStato() {
    if (this.colorCodeMode() !== 'border') return '';
    switch (this.paziente().codiceColore) {
      case 'ROSSO':
        return 'border-red-600';
      case 'ARANCIONE':
        return 'border-orange-400';
      case 'AZZURRO':
        return 'border-blue-600';
      case 'VERDE':
        return 'border-green-600';
      case 'BIANCO':
        return 'border-gray-600';
      default:
        return '';
    }
  }
}
