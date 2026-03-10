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
 * gestisce anche l'icona associata al tema corrente e la persistenza del tema scelto tramite localStorage.
 * @version 3.0.0
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeManagerV3 {
  readonly #theme = signal<ThemeConfig>(availTheme.light);
  readonly icon = computed(() => this.#theme().icon);

  /**
   * Carica il tema salvato in localStorage, se presente, e lo applica al documento.
   */
  public loadThemeFromLocalStorage() {
    const storedTheme = localStorage.getItem('app-theme') as ThemeMode | null;
    if (storedTheme && availTheme[storedTheme]) {
      this.#theme.set(availTheme[storedTheme]);
      this.applyTheme(storedTheme);
      console.log(`Loaded theme from localStorage: ${storedTheme}`);
    }
  }

  /**
   * Esegue il toggle del tema tra light e dark, applica il nuovo tema al documento e lo salva in localStorage.
   * Il toggle è basato sul tema attualmente attivo, quindi se il tema è light, verrà impostato dark e viceversa.
   */
  public toggleTheme() {
    const newTheme: ThemeMode = this.#theme().code === 'light' ? 'dark' : 'light';
    this.#theme.set(availTheme[newTheme]);
    this.setTheme(newTheme);
    //console.log(`Theme changed to: ${newTheme} with icon: ${availTheme[newTheme].icon}`);
  }

  private setTheme(theme: ThemeMode) {
    if (availTheme[theme]) {
      this.#theme.set(availTheme[theme]);
      this.applyTheme(theme);
      localStorage.setItem('app-theme', theme);
      //console.log(`Theme set to: ${theme} with icon: ${availTheme[theme].icon}`);
    } else {
      console.warn(`Attempted to set invalid theme: ${theme}`);
    }
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
