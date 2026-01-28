import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { ThemeManagerService } from '../../core/theme/theme-manager/theme-manager.service';

@Component({
  selector: 'app-ps-layout',
  imports: [MenubarModule, RouterOutlet, Button],
  templateUrl: './ps-layout.html',
  styleUrl: './ps-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsLayout {
  private readonly themeManager = inject(ThemeManagerService);
  toggleDarkMode() {
    //this.themeManager.setTheme('dark');
    const element = document.querySelector('html');
    element?.classList.toggle('p-dark');
  }
}
