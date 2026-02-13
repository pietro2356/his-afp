import { Component, signal } from '@angular/core';
import { DarckmodeSelector } from "./darckmode-selector/darckmode-selector";
import { CardPz } from "./card-pz/card-pz";

@Component({
  selector: 'app-root',
  imports: [DarckmodeSelector, CardPz],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('afp-his');
}
