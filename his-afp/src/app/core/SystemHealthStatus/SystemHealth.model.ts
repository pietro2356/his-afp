export interface APIHealthStatus {
  service: string;
  database: string;
  uptime: number;
}

export const HealthStatusMock: HealthStatus = {
  service: 'UNAVAILABLE',
  database: 'UNAVAILABLE',
  uptime: -1,
  serviceSeverity: 'danger',
  databaseSeverity: 'danger',
  uptimeSeverity: 'danger',
};

export type HealthStatus = APIHealthStatus & {
  serviceSeverity: 'success' | 'danger';
  databaseSeverity: 'success' | 'danger';
  uptimeSeverity: 'success' | 'danger';
};
