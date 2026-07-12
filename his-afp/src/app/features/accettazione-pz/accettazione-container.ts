import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RicercaPaziente } from './ricerca-paziente';
import { AccettazionePz } from './accettazione-pz';
import { PatientSearchResult } from '../../core/Pazienti/Pazienti.model';
import { Button } from 'primeng/button';

@Component({
  selector: 'his-accettazione-container',
  imports: [RicercaPaziente, AccettazionePz, Button],
  templateUrl: './accettazione-container.html',
  styleUrl: './accettazione-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazioneContainer {
  readonly pazienteSelezionato = signal<PatientSearchResult | null>(null);
  readonly mostraForm = signal<boolean>(false);

  onPazienteSelezionato(paziente: PatientSearchResult | null) {
    this.pazienteSelezionato.set(paziente);
    this.mostraForm.set(true);
  }

  nuovaRicerca() {
    this.mostraForm.set(false);
    this.pazienteSelezionato.set(null);
  }
}
