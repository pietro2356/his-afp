import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'his-modifica-pz',
  imports: [JsonPipe],
  templateUrl: './modifica-pz.html',
  styleUrl: './modifica-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModificaPz {
  patientId = input<string>();
  paziente = httpResource(() => `http://localhost:3000/admissions/${this.patientId()}`);
  readonly #router = inject(Router);

  constructor() {
    effect(() => {
      console.log('Patient ID changed:', this.patientId());
      if (this.patientId() === undefined) {
        console.warn('Patient ID is undefined. Navigating to default route.');
        //this.#router.navigate(['/lista-pz']);
      }
    });
  }
}
