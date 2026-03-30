import { Routes } from '@angular/router';
import { fetchPatientListResolver } from './core/Pazienti/resolver/fetch-patient-list-resolver';
import { patientInfoResolver } from './core/Pazienti/resolver/patient-info-resolver';

export const routes: Routes = [
  {
    path: 'lista-pz',
    loadComponent: () => import('./features/lista-pz/lista-pz').then((m) => m.ListaPz),
    resolve: {
      loadPz: fetchPatientListResolver,
    },
  },
  {
    path: 'accettazione-pz',
    loadComponent: () =>
      import('./features/accettazione-pz/accettazione-pz').then((m) => m.AccettazionePz),
  },
  // {
  //   path: 'modifica-pz',
  //   loadComponent: () => import('./features/modifica-pz/modifica-pz').then((m) => m.ModificaPz),
  // },
  {
    // /modifica-pz?id=2
    path: 'modifica-pz/:patientId',
    loadComponent: () => import('./features/modifica-pz/modifica-pz').then((m) => m.ModificaPz),
    resolve: {
      patientInfo: patientInfoResolver,
    },
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
