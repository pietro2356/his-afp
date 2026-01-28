import { Component, signal } from '@angular/core';
import { PsLayout } from './layout/ps-layout/ps-layout';

@Component({
  selector: 'app-root',
  imports: [PsLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('his-afp');
}
