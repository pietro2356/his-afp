import { effect, inject, Injectable, signal } from '@angular/core';
import { HealthStatus, HealthStatusMock } from './SystemHealth.model';
import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { APIResponse } from '../models/HttpResponse';

@Injectable({
  providedIn: 'root',
})
export class SystemHealthStatus {
  sts = httpResource<APIResponse<HealthStatus>>(() => `http://localhost:3000/health`);
  #http = inject(HttpClient);
  #sysHealthStatus = signal<HealthStatus>(HealthStatusMock);
  systemHealthStatus = this.#sysHealthStatus.asReadonly();

  constructor() {
    effect(() => {
      this.manageHttpResourceCall();
    });
  }
  /**
   * Fetches the system health status from the backend API and updates the signal with the new data.
   * If there's an error during the fetch, it logs the error and sets the signal to a default mock status.
   */
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
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching system health status:', err.message);
        this.#sysHealthStatus.set(HealthStatusMock);
      },
    });
  }

  public fetchSysHealthStsWithHttpResource() {
    console.log('Fetching system health status with httpResource...');
    this.sts.reload();
  }

  public getReadableUptime(): string {
    const uptime = this.systemHealthStatus().uptime;
    return this.secondsToReadableTime(uptime);
  }

  private manageHttpResourceCall() {
    console.log('Managing httpResource call for system health status...');
    if (this.sts.hasValue()) {
      const res = this.sts.value();
      this.#sysHealthStatus.set({
        ...res.data,
        serviceSeverity: this.setSeverityStatus(res.data.service),
        databaseSeverity: this.setSeverityStatus(res.data.database),
        uptimeSeverity: res.data.uptime > 0 ? 'success' : 'danger',
      });
    } else if (this.sts.error()) {
      console.error('Error fetching system health status:', this.sts.error()?.message);
      this.#sysHealthStatus.set(HealthStatusMock);
      this.#sysHealthStatus.set(HealthStatusMock);
    }
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
