import { booleanAttribute, Component, inject, input } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { SystemHealthStatus } from '../../core/SystemHealthStatus/system-health-status';

@Component({
  selector: 'his-health-status',
  imports: [Tag, Button],
  templateUrl: './health-status.component.html',
  styleUrl: './health-status.component.scss',
})
export class HealthStatus {
  readonly sysHealthStatusSrv = inject(SystemHealthStatus);
  readonly enableDebugMode = input(false, { transform: booleanAttribute });

  ngOnInit() {
    //this.sysHealthStatusSrv.fetchSystemHealthStatus();
  }
}
