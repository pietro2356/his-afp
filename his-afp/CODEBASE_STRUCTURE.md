# Struttura del Codebase - HIS-AFP

## 1. Configurazione di base

### package.json
Definisce le dipendenze, gli script di build e la configurazione del progetto Angular.

```json
{
  "name": "his-afp",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "packageManager": "npm@11.6.2",
  "dependencies": {
    "@angular/common": "^21.1.0",
    "@angular/compiler": "^21.1.0",
    "@angular/core": "^21.1.0",
    "@angular/forms": "^21.1.0",
    "@angular/platform-browser": "^21.1.0",
    "@angular/router": "^21.1.0",
    "@primeuix/themes": "^2.0.3",
    "@tailwindcss/postcss": "^4.1.18",
    "postcss": "^8.5.6",
    "primeicons": "^7.0.0",
    "primeng": "^21.0.4",
    "rxjs": "~7.8.0",
    "tailwindcss": "^4.1.18",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^21.1.1",
    "@angular/cli": "^21.1.1",
    "@angular/compiler-cli": "^21.1.0",
    "jsdom": "^27.1.0",
    "prettier": "^3.8.1",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}
```

### proxy.conf.json
Configurazione del proxy per il development server. Reindirizza le richieste `/api/**` al backend.

```json
{
  "/api/**": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### tsconfig.json
Configurazione TypeScript per l'intero progetto Angular.

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

---

## 2. Ambiente e avvio

### src/environments/environment.ts
Configurazione per l'ambiente di produzione.

```typescript
export const environment = {
  apiUrl: '/api',
  reparto: 'Pronto Soccorso',
  struttura: 'Presidio ospedaliero di Arco',
};
```

### src/environments/environment.development.ts
Configurazione per l'ambiente di development.

```typescript
export const environment = {
  apiUrl: '/api',
  reparto: 'Pronto Soccorso',
  struttura: 'Presidio ospedaliero di Arco',
};
```

### src/main.ts
Entry point dell'applicazione Angular. Esegue il bootstrap con la configurazione dell'app.

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

### src/index.html
Template HTML principale.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HisAfp</title>
  <base href="/">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link href="favicon.ico" rel="icon" type="image/x-icon">
  <script src="env.js"></script>
</head>
<body>
<app-root></app-root>
</body>
</html>
```

---

## 3. Moduli e routing (standalone)

### src/app/app.config.ts
Configurazione globale dell'applicazione. Fornisce providers per router, PrimeNG, e inizializza i servizi.

```typescript
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { PatientManager } from './core/Pazienti/patient-manager';
import { GestioneRisorse } from './core/Risorse/gestione-risorse';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          ripple: true,
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideAppInitializer(() => inject(PatientManager).fetchPazienti()),
    provideAppInitializer(() => inject(GestioneRisorse).fetchRisorse()),
  ],
};
```

### src/app/app.routes.ts
Definizione delle rotte dell'applicazione con lazy loading dei componenti.

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lista-pz',
    loadComponent: () => import('./features/lista-pz/lista-pz').then((m) => m.ListaPz),
  },
  {
    path: 'accettazione-pz',
    loadComponent: () =>
      import('./features/accettazione-pz/accettazione-pz').then((m) => m.AccettazionePz),
  },
  {
    path: 'modifica-pz/:patientId',
    loadComponent: () => import('./features/modifica-pz/modifica-pz').then((m) => m.ModificaPz),
  },
  {
    path: 'stato-servizi',
    loadComponent: () =>
      import('./features/stato-servizi/stato-servizi').then((m) => m.StatoServizi),
  },
  {
    path: '',
    redirectTo: 'lista-pz',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'stato-servizi',
    pathMatch: 'full',
  },
];
```

### src/app/app.ts
Componente root dell'applicazione.

```typescript
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './ui/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('his-afp');
}
```

### src/app/app.html
Template della componente root.

```html
<his-header/>
<div class="p-2 mt-4">
  <router-outlet/>
</div>
```

---

## 4. Modelli e servizi core

### src/app/core/models/APIResponse.model.ts
Interfaccia generica per le risposte API.

```typescript
export interface APIResponse<T> {
  status: string;
  data: T;
}
```

### src/app/core/Pazienti/Pazienti.model.ts
Interfacce e modelli per i pazienti.

```typescript
export interface Paziente {
  id: string; // id
  nome: string; // nome
  cognome: string; // cognome
  braccialetto: string; // braccialetto
  eta: number; // da calcolare con dataNascita
  codiceColore: string; // coloreCode
  note: string; // noteTriage
  patologia: string; // patologiaCode
}

export interface PazienteDTO {
  id: number;
  braccialetto: string;
  dataOraIngresso: string;
  stato: string;
  noteTriage: string;
  patologiaCode: string;
  nome: string;
  cognome: string;
  dataNascita: string;
  sex: string;
  codiceFiscale: string;
  patologiaDescrizione: string;
  coloreCode: string;
  coloreHex: string;
  coloreNome: string;
  modalitaArrivoCode: string;
  modalitaArrivoDescrizione: string;

  indirizzoVia: string;
  indirizzoCivico: string;
  comune: string;
  provincia: string;
}

export interface PatientAdmission {
  anagrafica: {
    nome: string;
    cognome: string;
    dataNascita: string;
    codiceFiscale: string;
    sesso: string;
  };
  sanitaria: {
    patologia: string;
    codiceColore: string;
    modArrivo: string;
    noteTriage: string;
  };
  residenza: {
    via: string;
    civico: string;
    comune: string;
    provincia: string;
  };
}

export interface PatientAdmissionRes {
  id: number;
  braccialetto: string;
}
```

### src/app/core/Pazienti/patient-manager.ts
Servizio per la gestione dei pazienti. Gestisce CRUD operations e sincronizzazione con il backend.

```typescript
import { inject, Injectable, signal } from '@angular/core';
import { PatientAdmission, PatientAdmissionRes, Paziente, PazienteDTO } from './Pazienti.model';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/APIResponse.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientManager {
  timer_id = signal<number>(-1);
  #http = inject(HttpClient);
  readonly #router = inject(Router);
  #listaPZ = signal<Paziente[]>([]);
  #listaPZFiltered = signal<Paziente[]>(this.#listaPZ());
  listaPZ = this.#listaPZFiltered.asReadonly();

  /**
   * Creazione timer di t secondi
   */
  public refreshPazienti() {
    if (this.timer_id() >= 0) return;
    let id = setInterval(() => this.fetchPazienti(), 1000);
    this.timer_id.set(id);
  }

  public stopRefreshPazienti() {
    clearInterval(this.timer_id());
    this.timer_id.set(-1);
  }

  public fetchPazienti() {
    this.#http.get<APIResponse<PazienteDTO[]>>(`/api/admissions`).subscribe({
      next: (res) => {
        const pz = res.data.map((p) => this.mapPazienteDTOToPaziente(p));
        this.#listaPZ.set(pz);
      },
      error: (err) => {
        console.error('Errore durante il fetch dei pazienti:', err);
      },
    });
  }

  public admitPatient(pz: PatientAdmission) {
    this.#http
      .post<APIResponse<PatientAdmissionRes>>(`${environment.apiUrl}/admissions`, pz)
      .subscribe({
        next: (res) => {
          this.#router.navigate([`/modifica-pz/${res.data.id}`]);
        },
        error: (err) => {
          console.error("Errore durante l'ammissione del paziente:", err);
        },
      });
  }

  public updatePatientInfo(pzId: number, residenza: Pick<PatientAdmission, 'residenza'>) {
    this.#http
      .patch<APIResponse<PatientAdmissionRes>>(`${environment.apiUrl}/patients/${pzId}`, residenza)
      .subscribe({
        next: (res) => {
          this.#router.navigate([`/lista-pz`]);
        },
        error: (err) => {
          console.error("Errore durante l'aggiornamento delle informazioni del paziente:", err);
        },
      });
  }

  public mapPazienteDTOToPaziente(pz: PazienteDTO): Paziente {
    return {
      id: pz.id.toString(),
      nome: pz.nome,
      cognome: pz.cognome,
      braccialetto: pz.braccialetto,
      codiceColore: pz.coloreCode,
      note: pz.noteTriage,
      patologia: pz.patologiaCode,
      eta: this.calcolaEta(pz.dataNascita),
    };
  }

  public calcolaEta(dataNascita: string): number {
    const today = new Date();
    const birthDate = new Date(dataNascita);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
```

### src/app/core/Risorse/risorse.model.ts
Interfacce per le risorse (colori triage, patologie, modalità di arrivo).

```typescript
export interface TriageColor {
  code: string;
  displayName: string;
  priority: number;
  hexValue: string;
}

export interface Pathology {
  code: string;
  description: string;
}

export interface ArrivalMode {
  code: string;
  description: string;
}
```

### src/app/core/Risorse/gestione-risorse.ts
Servizio per la gestione delle risorse (dizionari).

```typescript
import { inject, Injectable, signal } from '@angular/core';
import { ArrivalMode, Pathology, TriageColor } from './risorse.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../models/APIResponse.model';

@Injectable({
  providedIn: 'root',
})
export class GestioneRisorse {
  readonly #http = inject(HttpClient);
  readonly #triageColors = signal<TriageColor[]>([]);
  triageColors = this.#triageColors.asReadonly();
  readonly #pathologies = signal<Pathology[]>([]);
  pathologies = this.#pathologies.asReadonly();
  readonly #arrivalModes = signal<ArrivalMode[]>([]);
  arrivalModes = this.#arrivalModes.asReadonly();

  public fetchRisorse() {
    this.fetchTriageColors();
    this.fetchPathology();
    this.fetchArrivalModes();
  }

  private fetchTriageColors() {
    this.#http
      .get<APIResponse<TriageColor[]>>(`${environment.apiUrl}/resources/triage-colors`)
      .subscribe({
        next: (res: APIResponse<TriageColor[]>) => {
          this.#triageColors.set(res.data);
        },
        error: (err) => {
          console.error('Errore durante il fetch dei colori del triage:', err);
        },
      });
  }

  private fetchPathology() {
    this.#http
      .get<APIResponse<Pathology[]>>(`${environment.apiUrl}/resources/pathologies`)
      .subscribe({
        next: (res) => {
          this.#pathologies.set(res.data);
        },
        error: (err) => {
          console.error('Errore durante il fetch delle patologie:', err);
        },
      });
  }

  private fetchArrivalModes() {
    this.#http
      .get<APIResponse<ArrivalMode[]>>(`${environment.apiUrl}/resources/arrival-modes`)
      .subscribe({
        next: (res) => {
          this.#arrivalModes.set(res.data);
        },
        error: (err) => {
          console.error('Errore durante il fetch delle modalità di arrivo:', err);
        },
      });
  }
}
```

### src/app/core/SystemStatus/HealthStatus.model.ts
Interfaccia e mock per lo stato di salute del sistema.

```typescript
export interface HealthStatus {
  service: string;
  database: string;
  uptime: number;
}

export const healthStatusMock: HealthStatus = {
  service: 'UNAVAILABLE',
  database: 'UNAVAILABLE',
  uptime: -1,
};
```

### src/app/core/SystemStatus/system-status.ts
Servizio per il monitoraggio dello stato del sistema.

```typescript
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthStatus, healthStatusMock } from './HealthStatus.model';
import { APIResponse } from '../models/APIResponse.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SystemStatus {
  #http = inject(HttpClient);
  #statoAPI = signal<HealthStatus>(healthStatusMock);

  statoAPI = this.#statoAPI.asReadonly();

  constructor() {
    this.fetchStatoAPI();
  }

  public fetchStatoAPI() {
    this.#http.get<APIResponse<HealthStatus>>(`${environment.apiUrl}/health`).subscribe({
      next: (res) => {
        this.#statoAPI.set(res.data);
      },
      error: (err) => {
        console.error(err);
        this.#statoAPI.set(healthStatusMock);
      },
    });
  }
}
```

---

## 5. Componenti UI principali (layout)

### src/app/ui/header/header.ts
Componente header principale dell'applicazione.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DarkmodeSelector } from '../darkmode-selector/darkmode-selector.component';
import { Divider } from 'primeng/divider';
import { environment } from '../../../environments/environment';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'his-header',
  imports: [Button, RouterLink, DarkmodeSelector, Divider, TagModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  reparto = environment.reparto;
  struttura = environment.struttura;

  type = (window as any).env?.type;
  version = (window as any).env?.version;
}
```

### src/app/ui/header/header.html
Template del componente header.

```html
<header class="flex flex-row items-center shadow-md backdrop-opacity-5">
  <!-- LOGO -->
  <div class="flex items-center justify-center p-1">
    <img alt="logoASUIT" class="w-40" src="logo-asuit.svg">
  </div>
  <!-- AZIENDA: Località + Reparto -->
  <div class="pl-1">
    <h1 class="text-4xl font-bold text-primary">{{ reparto }}</h1>
    <p class="text-md text-primary">
      {{ struttura }} -
      @switch (type) {
        @case ('PROD') {
          <p-tag severity="info" value="v{{version}} - {{type}}"/>
        }
        @case ('TEST') {
          <p-tag severity="success" value="v{{version}} - {{type}}"/>
        }
        @case ('SVI') {
          <p-tag severity="contrast" value="v{{version}} - {{type}}"/>
        }
        @case ('LOCAL') {
          <p-tag severity="secondary" value="v{{version}} - {{type}}"/>
        }
      }
    </p>
  </div>

  <!--  DIVIDER-->
  <p-divider layout="vertical"/>
  <!-- AZIONI -->
  <nav class="flex flex-row items-center gap-3 pl-4">
    <p-button label="Lista PZ" routerLink="/lista-pz" variant="outlined"/>
    <p-button label="Accettazione PZ" routerLink="/accettazione-pz" variant="outlined"/>
    <p-button label="Stato Servizi" routerLink="/stato-servizi" variant="outlined"/>
  </nav>

  <div class="ml-auto mr-4">
    <his-darckmode-selector/>
  </div>
</header>
```

---

## 6. Feature già sviluppate

### src/app/features/lista-pz/lista-pz.ts
Componente per la visualizzazione della lista dei pazienti.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabellaPz } from '../../pattern/tabella-pz/tabella-pz';

@Component({
  selector: 'his-lista-pz',
  imports: [TabellaPz],
  templateUrl: './lista-pz.html',
  styleUrl: './lista-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPz {}
```

### src/app/features/lista-pz/lista-pz.html
Template della lista pazienti.

```html
<h1>Tabella Pazienti</h1>
<his-tabella-pz/>
```

### src/app/features/accettazione-pz/accettazione-pz.ts
Componente per l'accettazione di un nuovo paziente.

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GestioneRisorse } from '../../core/Risorse/gestione-risorse';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { DatePicker } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Fieldset } from 'primeng/fieldset';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { PatientAdmission } from '../../core/Pazienti/Pazienti.model';

@Component({
  selector: 'his-accettazione-pz',
  imports: [
    InputText,
    ReactiveFormsModule,
    Button,
    Message,
    DatePicker,
    SelectModule,
    Textarea,
    Fieldset,
  ],
  templateUrl: './accettazione-pz.html',
  styleUrl: './accettazione-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccettazionePz {
  gestioneRisorse = inject(GestioneRisorse);
  patientManager = inject(PatientManager);

  readonly maxDate = new Date();
  readonly sexOption = [
    {
      code: 'M',
      desc: 'Maschio',
    },
    {
      code: 'F',
      desc: 'Femmina',
    },
  ];

  readonly #fb = inject(FormBuilder);
  paziente = this.#fb.group({
    anagrafica: this.#fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      codiceFiscale: [
        '',
        [Validators.required, Validators.pattern('[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]')],
      ],
      sesso: ['', [Validators.required]],
    }),
    sanitaria: this.#fb.group({
      patologia: ['', [Validators.required]],
      codiceColore: ['', [Validators.required]],
      modArrivo: ['', [Validators.required]],
      noteTriage: ['', [Validators.required, Validators.maxLength(500)]],
    }),
  });

  checkFormControl(control: string) {
    const fc = this.paziente.get(control);
    return fc?.invalid && (fc.touched || fc.dirty);
  }

  checkFormControlError(control: string, err: string) {
    const fc = this.paziente.get(control);

    if (fc && fc.hasError(err)) {
      return fc.getError(err);
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.paziente.valid) {
      console.log(this.paziente.value);
      this.patientManager.admitPatient(this.paziente.value as PatientAdmission);
    } else {
      this.paziente.markAllAsTouched();
    }
  }
}
```

### src/app/features/modifica-pz/modifica-pz.ts
Componente per la modifica dei dati del paziente.

```typescript
import { ChangeDetectionStrategy, Component, effect, inject, input, untracked } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { PatientAdmission, PazienteDTO } from '../../core/Pazienti/Pazienti.model';
import { APIResponse } from '../../core/models/APIResponse.model';
import { Button } from 'primeng/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Fieldset } from 'primeng/fieldset';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { GestioneRisorse } from '../../core/Risorse/gestione-risorse';
import { formatDate } from '@angular/common';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'his-modifica-pz',
  imports: [
    Button,
    DatePicker,
    Fieldset,
    FormsModule,
    InputText,
    Message,
    ReactiveFormsModule,
    Select,
    Textarea,
  ],
  templateUrl: './modifica-pz.html',
  styleUrl: './modifica-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModificaPz {
  patientId = input<string>();
  gestioneRisorse = inject(GestioneRisorse);
  patientManager = inject(PatientManager);
  patientReq = httpResource<APIResponse<PazienteDTO>>(
    () => `${environment.apiUrl}/admissions/${this.patientId()}`,
  );
  readonly maxDate = new Date();
  readonly sexOption = [
    {
      code: 'M',
      desc: 'Maschio',
    },
    {
      code: 'F',
      desc: 'Femmina',
    },
  ];

  readonly #fb = inject(FormBuilder);
  paziente = this.#fb.group({
    anagrafica: this.#fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      codiceFiscale: [
        '',
        [Validators.required, Validators.pattern('[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]')],
      ],
      sesso: ['', [Validators.required]],
    }),
    sanitaria: this.#fb.group({
      patologia: ['', [Validators.required]],
      codiceColore: ['', [Validators.required]],
      modArrivo: ['', [Validators.required]],
      noteTriage: ['', [Validators.required, Validators.maxLength(500)]],
    }),
    residenza: this.#fb.group({
      via: ['', [Validators.required]],
      civico: ['', [Validators.required]],
      comune: ['', [Validators.required]],
      provincia: ['', [Validators.required, Validators.maxLength(5)]],
    }),
  });

  constructor() {
    effect(() => {
      if (this.patientId() === undefined) {
        console.warn(
          'Patient ID is undefined. Please provide a valid patient ID in the route parameters.',
        );
      }

      if (this.patientReq.hasValue()) {
        const data = this.patientReq.value().data;
        untracked(() => {
          this.paziente.patchValue({
            anagrafica: {
              nome: data.nome,
              cognome: data.cognome,
              dataNascita: formatDate(data.dataNascita, 'dd/MM/yyyy', 'en'),
              codiceFiscale: data.codiceFiscale,
              sesso: data.sex,
            },
            sanitaria: {
              patologia: data.patologiaCode,
              modArrivo: data.modalitaArrivoCode,
              noteTriage: data.noteTriage,
              codiceColore: data.coloreCode,
            },
            residenza: {
              via: data.indirizzoVia,
              civico: data.indirizzoCivico,
              comune: data.comune,
              provincia: data.provincia,
            },
          });
          this.paziente.get('anagrafica')?.disable();
          this.paziente.get('sanitaria')?.disable();
        });
      }
    });
  }

  checkFormControl(control: string) {
    const fc = this.paziente.get(control);
    return fc?.invalid && (fc.touched || fc.dirty);
  }

  checkFormControlError(control: string, err: string) {
    const fc = this.paziente.get(control);

    if (fc && fc.hasError(err)) {
      return fc.getError(err);
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.paziente.valid) {
      console.log(this.paziente.value);
      this.patientManager.updatePatientInfo(
        Number(this.patientId()) || -1,
        this.paziente.value.residenza as Pick<PatientAdmission, 'residenza'>,
      );
    } else {
      this.paziente.markAllAsTouched();
    }
  }
}
```

### src/app/features/stato-servizi/stato-servizi.ts
Componente per visualizzare lo stato dei servizi.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'his-stato-servizi',
  imports: [],
  templateUrl: './stato-servizi.html',
  styleUrl: './stato-servizi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatoServizi {

}
```

### src/app/features/stato-servizi/stato-servizi.html
Template dello stato servizi.

```html
<p>stato-servizi works!</p>
```

---

## 7. Componenti condivisi

### src/app/pattern/tabella-pz/tabella-pz.ts
Componente per visualizzare una tabella/griglia di pazienti con filtri e refresh.

```typescript
import { ChangeDetectionStrategy, Component, effect, inject, model } from '@angular/core';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { CardPz } from '../../ui/card-pz/card-pz';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'his-tabella-pz',
  imports: [FormsModule, InputText, CardPz, Button, ToggleSwitch],
  templateUrl: './tabella-pz.html',
  styleUrl: './tabella-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabellaPz {
  readonly PatientManager = inject(PatientManager);
  nomePaziente = model<string>('');
  enableRefreshPz = model<boolean>(false);

  constructor() {
    effect(() => {
      this.PatientManager.filterByName(this.nomePaziente());

      if (this.enableRefreshPz()) {
        this.PatientManager.refreshPazienti();
      } else {
        this.PatientManager.stopRefreshPazienti();
      }
    });
  }
}
```

### src/app/pattern/tabella-pz/tabella-pz.html
Template della tabella pazienti.

```html
<p-button
  (onClick)="PatientManager.fetchPazienti()"
  [rounded]="true"
  [text]="true"
  icon="pi pi-refresh"
  severity="secondary"
/>
<p-button
  (onClick)="PatientManager.stopRefreshPazienti()"
  [rounded]="true"
  [text]="true"
  icon="pi pi-stop"
  severity="warn"
/>
<p-toggle-switch
  [(ngModel)]="enableRefreshPz"
/>
<p>{{ enableRefreshPz() }}</p>
<input
  [(ngModel)]="nomePaziente"
  pInputText
  type="text"
>

<p>Pazienti presenti in PS: {{ PatientManager.listaPZ().length }}</p>

<div class="flex flex-wrap flex-row gap-4 p-4">
  @for (paziente of PatientManager.listaPZ(); track paziente.braccialetto) {
    <his-card-pz [borderTop]="false" [paziente]="paziente"/>
  } @empty {
    <h1>Nessun paziente in attesa</h1>
  }
</div>
```

### src/app/ui/card-pz/card-pz.ts
Componente card per visualizzare i dati di un singolo paziente.

```typescript
import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { Paziente } from '../../core/Pazienti/Pazienti.model';
import { Router } from '@angular/router';

@Component({
  selector: 'his-card-pz',
  imports: [CardModule, Button],
  templateUrl: './card-pz.html',
  styleUrl: './card-pz.scss',
})
export class CardPz {
  paziente = input.required<Paziente>();
  borderTop = input.required<boolean>();
  readonly #router = inject(Router);

  public navigateToSchedaPaziente() {
    this.#router.navigate([`/modifica-pz/${this.paziente().id}`]);
  }

  setBorder() {
    return this.borderTop() ? 'border-t-8' : 'border-b-8';
  }

  setColoreDiStato() {
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
```

### src/app/ui/card-pz/card-pz.html
Template della card paziente.

```html
<div class="mb-4 p-4">
  <p-card
    class="w-2xs {{setBorder()}} {{setColoreDiStato()}}"
    header="{{paziente().cognome}} {{paziente().nome}}"
    subheader="{{paziente().braccialetto}} - {{paziente().codiceColore}}"
  >
    <p>
      <b>{{ paziente().patologia }}</b>
      <br>
      Note Triage: {{ paziente().note }}
    </p>

    <ng-template #footer>
      <p-button
        (onClick)="navigateToSchedaPaziente()"
        label="Modifica"
      />
    </ng-template>
  </p-card>
</div>
```

---

## 8. Stili globali

### src/styles.scss
Stili globali dell'applicazione.

```scss
/* You can add global styles to this file, and also import other style files */
@use "tailwindcss";
@import "primeicons/primeicons.css";

// body {
//     font-family: var(--font-family), sans-serif;
//     margin: 0;
//     background-color: #f8f9fa;
// }
```

### src/tailwind.config.css
Configurazione Tailwind CSS.

```css
@import 'tailwindcss';
```

---

## Riepilogo architettura

### Stack tecnologico
- **Angular 21**: Framework frontend
- **TypeScript**: Linguaggio di programmazione
- **Tailwind CSS + PrimeNG**: Framework CSS e componenti UI
- **RxJS**: Gestione asincrona e reattività
- **Angular Forms**: Gestione dei form (Reactive Forms)

### Principi architetturali
- **Standalone Components**: Componenti Angular standalone senza moduli
- **Dependency Injection**: Iniezione delle dipendenze tramite `inject()`
- **Signals**: Gestione dello stato reattivo con `signal()`
- **Lazy Loading**: Caricamento lazy delle rotte
- **Services**: Logica di business centralizzata nei servizi
- **HttpClient**: Comunicazione con il backend

### Flusso dati
1. I servizi (`PatientManager`, `GestioneRisorse`, `SystemStatus`) comunicano con l'API backend
2. I dati sono memorizzati in signals per la reattività
3. I componenti si sottoscrivono ai segnali per il rendering
4. Le azioni dell'utente aggiornano i dati attraverso i servizi

