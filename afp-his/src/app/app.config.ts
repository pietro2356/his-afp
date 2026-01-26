import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [providePrimeNG({
    theme: {
      preset: Aura, // Tema di default PrimeNG
      options: {
        ripple: true, // Animazioni
        darkModeSelector: '.my-app-dark' // Tema scuro
      }
    }
  }),
  
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
