import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PatientManager } from '../../core/Pazienti/patient-manager';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { ColorBox } from '../../ui/color-box/color-box';

@Component({
  selector: 'his-tabella-pz',
  imports: [FormsModule, TableModule, IconFieldModule, ColorBox],
  templateUrl: './tabella-pz.html',
  styleUrl: './tabella-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabellaPz {
  readonly PatientManager = inject(PatientManager);
  constructor() {
    //this.PatientManager.filterByName('');
  }
}
