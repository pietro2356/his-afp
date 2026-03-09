import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeManagerV3 } from '../../core/Theme/theme-manager-v3';

@Component({
  selector: 'his-darckmode-selector',
  imports: [ButtonModule],
  templateUrl: './darkmode-selector.component.html',
  styleUrl: './darkmode-selector.component.scss',
})
export class DarkmodeSelector {
  readonly themeManager = inject(ThemeManagerV3);
  constructor() {
    //this.themeManager.loadThemeFromLocalStorage();
  }
}
