import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { PatientSearchResult, SearchMode } from '../../core/Pazienti/Pazienti.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Message } from 'primeng/message';
import { formatDate } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'his-ricerca-paziente',
  imports: [ReactiveFormsModule, Button, InputText, DatePicker, Message, CardModule],
  templateUrl: './ricerca-paziente.html',
  styleUrl: './ricerca-paziente.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RicercaPaziente {
  readonly patientManager = inject(PatientManager);

  readonly mode = signal<SearchMode>('cf');
  readonly risultati = signal<PatientSearchResult[]>([]);
  readonly cercato = signal<boolean>(false);
  readonly errore = signal<string | null>(null);

  pazienteSelezionato = output<PatientSearchResult | null>();

  readonly maxDate = new Date();

  readonly #fb = inject(FormBuilder);
  ricerca = this.#fb.group({
    cf: ['', [Validators.pattern('[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]')]],
    nome: ['', [Validators.required]],
    cognome: ['', [Validators.required]],
    dataNascita: ['', [Validators.required]],
  });

  cambiaModalita(nuova: SearchMode) {
    this.mode.set(nuova);
    this.ricerca.reset();
    this.risultati.set([]);
    this.cercato.set(false);
    this.errore.set(null);
  }

  onCerca() {
    this.errore.set(null);
    this.risultati.set([]);

    if (this.mode() === 'cf') {
      const cf = this.ricerca.get('cf')?.value ?? '';
      if (!cf) {
        this.ricerca.get('cf')?.markAsTouched();
        return;
      }
      this.#eseguiRicerca({ cf });
    } else {
      const nome = this.ricerca.get('nome')?.value ?? '';
      const cognome = this.ricerca.get('cognome')?.value ?? '';
      const rawData = this.ricerca.get('dataNascita')?.value;
      const dataNascita = rawData ? formatDate(rawData, 'yyyy-MM-dd', 'en') : '';

      if (!nome || !cognome || !dataNascita) {
        this.ricerca.markAllAsTouched();
        return;
      }
      this.#eseguiRicerca({ nome, cognome, dataNascita });
    }
  }

  #eseguiRicerca(params: {
    cf?: string;
    nome?: string;
    cognome?: string;
    dataNascita?: string;
  }) {
    this.patientManager.searchPatients(params).subscribe({
      next: (res) => {
        this.risultati.set(res.data ?? []);
        this.cercato.set(true);
      },
      error: (err) => {
        console.error('Errore durante la ricerca del paziente:', err);
        this.errore.set('Si è verificato un errore durante la ricerca.');
        this.cercato.set(true);
      },
    });
  }

  onSeleziona(paziente: PatientSearchResult) {
    this.pazienteSelezionato.emit(paziente);
  }

  onNuovoPaziente() {
    this.pazienteSelezionato.emit(null);
  }

  protected readonly etaPaziente = (dataNascita: string): number =>
    this.patientManager.calcolaEta(dataNascita);
}
