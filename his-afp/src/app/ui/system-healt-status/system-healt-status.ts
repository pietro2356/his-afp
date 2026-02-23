import { Component, inject, input } from '@angular/core';
import { SystemHealthStatus } from '../../core/SystemHealthStatus/system-health-status';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'his-system-healt-status',
  imports: [Tag, Button, DatePipe],
  templateUrl: './system-healt-status.html',
  styleUrl: './system-healt-status.scss',
})
export class SystemHealtStatus {
  readonly sysHealthStatusSrv = inject(SystemHealthStatus);
  readonly enableDebugMode = input<boolean>(false);

  ngOnInit() {
    this.sysHealthStatusSrv.fetchSystemHealthStatus();
  }
}
