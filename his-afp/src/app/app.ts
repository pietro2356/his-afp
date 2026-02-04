import { Component, signal } from '@angular/core';
import { DarkmodeSelector } from './darkmode-selector/darkmode-selector.component';
import { CardPz } from './card-pz/card-pz';
import { ElencoPz } from './elenco-pz/elenco-pz';

@Component({
  selector: 'app-root',
  imports: [DarkmodeSelector, DarkmodeSelector, CardPz, ElencoPz],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('his-afp');
}
