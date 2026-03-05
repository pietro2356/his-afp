import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from './ui/header/header';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('his-afp');
  readonly #router = inject(Router);

  public navigateToPatient() {
    this.#router.navigate(['/modifica-pz/'], {
      queryParams: { idd: 2 },
    });
  }
}
