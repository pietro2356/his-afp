import { Component, signal } from '@angular/core';
import { DarkmodeSelector } from './darckmode-selector/darkmode-selector.component';

@Component({
  selector: 'app-root',
  imports: [DarkmodeSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('his-afp');
}
