import { Component } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'app-darckmode-selector',
  imports: [Button],
  templateUrl: './darckmode-selector.html',
  styleUrl: './darckmode-selector.scss',
})
export class DarckmodeSelector {
  
toggleDarkMode() {
  const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
}
}
