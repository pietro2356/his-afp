import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type TTheme = 'light' | 'dark' | 'high-contrast';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly currentTheme = signal<TTheme>('light');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedTheme = localStorage.getItem('sio-theme') as TTheme;
    if (savedTheme) this.currentTheme.set(savedTheme);

    effect(() => {
      const theme = this.currentTheme();
      const body = document.body;

      body.classList.remove('light', 'dark', 'high-contrast');

      if (theme === 'dark') {
        body.classList.add('dark');
      } else if (theme === 'high-contrast') {
        body.classList.add('high-contrast');
      }

      localStorage.setItem('sio-theme', theme);
    });
  }

  setTheme(theme: TTheme) {
    this.currentTheme.set(theme);
    console.log(`Theme set to ${theme}`);
  }
}
