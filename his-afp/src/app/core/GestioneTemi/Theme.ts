import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  private darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  isDarkMode() {
    return this.darkMode;
  }


}
