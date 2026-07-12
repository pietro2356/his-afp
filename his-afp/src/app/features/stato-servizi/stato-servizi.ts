import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SystemStatus } from '../../core/SystemStatus/system-status';

@Component({
  selector: 'his-stato-servizi',
  imports: [Button, CardModule, TagModule],
  templateUrl: './stato-servizi.html',
  styleUrl: './stato-servizi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatoServizi {
  readonly systemStatus = inject(SystemStatus);

  refreshStatus() {
    this.systemStatus.fetchStatoAPI();
  }
}
