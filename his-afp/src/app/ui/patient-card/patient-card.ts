import { Component, computed, input, output } from '@angular/core';
import { Admission } from '../../core/models/admission.model';
import { Card } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-patient-card',
  imports: [Card, DatePipe, Button],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.scss',
})
export class PatientCard {
  // 1. INPUT: Riceviamo il paziente (Props)
  // .required significa che Angular spacca la build se non glielo passi.
  admission = input.required<Admission>();

  // 2. OUTPUT: Eventi verso il padre (come passare una callback in React)
  processAction = output<number>();

  // 3. COMPUTED: Deriviamo dati (Simile a useMemo, ma automatico)
  // Si aggiorna SOLO se cambia 'admission'.
  fullName = computed(() => {
    return `${this.admission().patientName} ${this.admission().patientSurname}`;
  });

  // Classe CSS dinamica in base alla priorità
  priorityClass = computed(() => {
    switch (this.admission().triageColor) {
      case 'ROSSO':
        return 'border-l-8 border-red-600';
      case 'ARANCIONE':
        return 'border-l-8 border-orange-400';
      case 'AZZURRO':
        return 'border-l-8 border-blue-500';
      case 'VERDE':
        return 'border-l-8 border-green-600';
      case 'BIANCO':
        return 'border-l-8 border-gray-400';
      default:
        return '';
    }
  });

  onProcess() {
    return this.processAction.emit(this.admission().id);
  }
}
