import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Admission } from '../../core/models/admission.model';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableRowDirective } from '../../core/directive/table-row';

@Component({
  selector: 'app-table-pz',
  imports: [TableModule, TableRowDirective, DatePipe],
  templateUrl: './table-pz.html',
  styleUrl: './table-pz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePz {
  readonly listaPazienti = input.required<Admission[]>();
  groupBy = signal<string>('codice_colore.priority');
  groupByOptions = signal<string[]>(['codice_colore.priority', 'stato', 'none']);
}
