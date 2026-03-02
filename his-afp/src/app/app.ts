import { Component, signal } from '@angular/core';
import { DarkmodeSelector } from './ui/darkmode-selector/darkmode-selector.component';
import { TabellaPz } from './pattern/lista-pz/tabella-pz.component';

@Component({
  selector: 'app-root',
  imports: [DarkmodeSelector, TabellaPz],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('his-afp');
}
