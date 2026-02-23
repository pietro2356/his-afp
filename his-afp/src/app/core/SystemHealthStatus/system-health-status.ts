import { inject, Injectable, signal } from '@angular/core';
import { HealthStatus, HealthStatusMock } from './SystemHealth.model';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/HttpResponse';

@Injectable({
  providedIn: 'root',
})
export class SystemHealthStatus {
  #http = inject(HttpClient);
  #sysHealthStatus = signal<HealthStatus>(HealthStatusMock);

  systemHealthStatus = this.#sysHealthStatus.asReadonly();

  public fetchSystemHealthStatus() {
    this.#http.get<APIResponse<HealthStatus>>('http://localhost:3000/health').subscribe({
      next: (res) => {
        this.#sysHealthStatus.set({
          ...res.data,
          serviceSeverity: this.setSeverityStatus(res.data.service),
          databaseSeverity: this.setSeverityStatus(res.data.database),
          uptimeSeverity: res.data.uptime > 0 ? 'success' : 'danger',
        });
      },
      error: (err) => {
        console.error('Error fetching system health status:', err);
        this.#sysHealthStatus.set(HealthStatusMock);
      },
    });
  }

  public getReadableUptime(): string {
    const uptime = this.systemHealthStatus().uptime;
    return this.secondsToReadableTime(uptime);
  }

  private secondsToReadableTime(seconds: number): string {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds) % 60;

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  }

  private setSeverityStatus(status: string): 'success' | 'danger' {
    return status === 'UP' || status === 'CONNECTED' ? 'success' : 'danger';
  }
}
