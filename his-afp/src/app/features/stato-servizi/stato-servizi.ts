import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Button } from 'primeng/button';
import { StatoAPI } from '../../ui/stato-api/stato-api';

interface IEnvProp {
  production: boolean;
  environment: string;
  version: string;
  apiUrl: string;
}

const ENV_PROP_MOCK: IEnvProp = {
  production: false,
  environment: 'MOCK',
  version: 'N/A',
  apiUrl: 'N/A',
};

@Component({
  selector: 'his-stato-servizi',
  imports: [Button, StatoAPI],
  templateUrl: './stato-servizi.html',
  styleUrl: './stato-servizi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatoServizi {
  readonly prop = signal<IEnvProp>(ENV_PROP_MOCK);
  env = (window as any).env?.type || 'unknown';
  readonly #http = inject(HttpClient);

  loadEnvPropViaFile() {
    if (this.env === 'unknown') {
      console.warn('Environment type is unknown. Cannot load environment properties.');
      return;
    }
    this.#http.get<IEnvProp>(`./env/${this.env}.json`).subscribe({
      next: (data) => {
        console.table(data);
        this.prop.set(data);
      },
      error: (err) => {
        console.error('Error loading environment properties:', err);
      },
    });
  }
}
