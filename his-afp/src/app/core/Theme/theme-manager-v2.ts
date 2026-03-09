import { Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';
type IconCode = 'pi-sun' | 'pi-moon';

/**
 * Servizio avanzato per la gestione del tema del nostro SIO.
 * Oltre a fornire le funzionalità di base per il toggle del tema e l'applicazione del tema al documento,
 * gestisce anche l'icona associata al tema corrente.
 * @version 2.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeManagerV2 {
  readonly #theme = signal<ThemeMode>('light');
  readonly #icon = signal<IconCode>('pi-sun');

  icon = this.#icon.asReadonly();

  public toggleTheme() {
    const newTheme = this.#theme() === 'light' ? 'dark' : 'light';
    this.#theme.set(newTheme);
    const newIcon: IconCode = newTheme === 'light' ? 'pi-sun' : 'pi-moon';
    this.#icon.set(newIcon);
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
