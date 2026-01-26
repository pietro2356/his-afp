import { Component, signal } from '@angular/core';
import { DarckmodeSelector } from "./darckmode-selector/darckmode-selector";

@Component({
  selector: 'app-root',
  imports: [DarckmodeSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('afp-his');
}
