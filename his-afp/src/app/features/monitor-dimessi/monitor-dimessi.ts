import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MonitorDimessiService } from '../../core/MonitorDimessi/monitor-dimessi.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Button } from 'primeng/button';
import { formatDate } from '@angular/common';

@Component({
  selector: 'his-monitor-dimessi',
  imports: [TableModule, TagModule, Button],
  templateUrl: './monitor-dimessi.html',
  styleUrl: './monitor-dimessi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorDimessi {
  readonly monitor = inject(MonitorDimessiService);

  constructor() {
    this.monitor.fetchDimessi();
  }

  protected formatDateTime(iso: string): string {
    return formatDate(iso, 'dd/MM/yyyy HH:mm', 'en');
  }
}
