import {Component, computed, inject, model, signal} from '@angular/core';
import {CardPz, Paziente} from '../card-pz/card-pz';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {ApiResponseType, HealthStatus, HealthStatusMock} from '../core/models/Response';

@Component({
  selector: 'his-lista-pz',
  imports: [InputTextModule, FormsModule, ButtonModule, CardPz, TagModule],
  templateUrl: './lista-pz.html',
  styleUrl: './lista-pz.scss',
})
export class ListaPz {
  nomePaziente = model<string>('');
  listaPz = signal<Paziente[]>([
    {
      braccialetto: 'PR234',
      codiceColore: 'VERDE',
      cognome: 'Rocchio',
      eta: 25,
      id: '23',
      nome: 'Pietro',
      note: 'TRauma',
      patologia: 'C19',
    },
    {
      braccialetto: 'BR0034',
      codiceColore: 'ARANCIONE',
      cognome: 'Brazorf',
      eta: 25,
      id: '1',
      nome: 'Ajeje',
      note: 'TRauma',
      patologia: 'C19',
    },
    {
      braccialetto: 'LSD',
      codiceColore: 'ROSSO',
      cognome: 'Winky',
      eta: 25,
      id: '1',
      nome: 'Tinky',
      note: 'TRauma',
      patologia: 'C19',
    },
    {
      braccialetto: 'LSD',
      codiceColore: 'AZZURRO',
      cognome: 'Winky',
      eta: 25,
      id: '1',
      nome: 'Tinky',
      note: 'TRauma',
      patologia: 'C19',
    },
    {
      braccialetto: 'LSD',
      codiceColore: 'AZZURRO',
      cognome: 'Winky',
      eta: 25,
      id: '1',
      nome: 'Tinky',
      note: 'TRauma',
      patologia: 'C19',
    },
  ]);

  healthStatus = signal<HealthStatus>(HealthStatusMock);

  filteredList = computed(() => {
    return this.listaPz().filter((pz: Paziente) =>
      pz.nome.toLowerCase().includes(this.nomePaziente().toLowerCase()),
    );
  });
  readonly #http = inject(HttpClient);

  constructor() {
    this.getHealthStatus();
  }

  editNomePaziente(nomePZ: string) {
    this.nomePaziente.set(nomePZ);
  }

  getHealthStatus() {
    this.#http
      .get<ApiResponseType<HealthStatus>>('http://localhost:3000/health')
      .subscribe((res) => {
        switch (res.status) {
          case 'success':
            console.log('Health status fetched successfully');
            this.healthStatus.set(res.data);
            break;
          case 'error':
            console.error(`Error fetching health status: ${res.message} (code: ${res.code})`);
            break;
          default:
            console.error('Unexpected response format:', res);
            break;
        }
      });
  }
}
