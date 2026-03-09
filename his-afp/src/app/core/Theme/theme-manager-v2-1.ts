import { computed, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';
type IconCode = 'pi-sun' | 'pi-moon';

interface ThemeConfig {
  code: ThemeMode;
  icon: IconCode;
}

type ThemeState = Record<ThemeMode, ThemeConfig>;

const availTheme: ThemeState = {
  light: { code: 'light', icon: 'pi-sun' },
  dark: { code: 'dark', icon: 'pi-moon' },
};

/**
 * Servizio avanzato per la gestione del tema del nostro SIO.
 * Oltre a fornire le funzionalità di base per il toggle del tema e l'applicazione del tema al documento,
 * gestisce anche l'icona associata al tema corrente.
 * @version 2.1.0
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeManagerV21 {
  readonly #theme = signal<ThemeConfig>(availTheme.light);
  readonly icon = computed(() => this.#theme().icon);

  public toggleTheme() {
    const newTheme: ThemeMode = this.#theme().code === 'light' ? 'dark' : 'light';
    this.#theme.set(availTheme[newTheme]);
    this.applyTheme(newTheme);
    console.log(`Theme changed to: ${newTheme} with icon: ${availTheme[newTheme].icon}`);
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
