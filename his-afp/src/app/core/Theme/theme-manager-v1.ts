import { Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

/**
 * Servizio base per la gestione del tema del nostro SIO.
 * Fornisce le funzionalità di base per il toggle del tema e l'applicazione del tema al documento.
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeManagerV1 {
  readonly #theme = signal<ThemeMode>('light');

  public toggleTheme() {
    const newTheme = this.#theme() === 'light' ? 'dark' : 'light';
    this.#theme.set(newTheme);
    this.applyTheme(newTheme);
    console.log(`Theme changed to: ${newTheme}`);
  }

  private applyTheme(theme: ThemeMode) {
    const element = document.querySelector('html');
    if (theme === 'dark') {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }
}
