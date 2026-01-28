import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-ps-layout',
  imports: [MenubarModule, RouterOutlet, Button],
  templateUrl: './ps-layout.html',
  styleUrl: './ps-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsLayout {
  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }
}
