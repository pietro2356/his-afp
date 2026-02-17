export interface ApiResponseError {
  status: 'error';
  code: number;
  message: string;
}

export interface ApiResponseSuccess<T> {
  status: 'success';
  data: T;
  results?: number;
}

export type ApiResponseType<T = unknown> = ApiResponseSuccess<T> | ApiResponseError;

export interface HealthStatus {
  service: string;
  database: string;
  uptime: number;
}
export const HealthStatusMock: HealthStatus = {
  service: 'UNAVAILABLE',
  database: 'UNAVAILABLE',
  uptime: -1,
};
