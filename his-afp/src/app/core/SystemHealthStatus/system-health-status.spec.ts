import { TestBed } from '@angular/core/testing';

import { SystemHealthStatus } from './system-health-status';

describe('SystemHealthStatus', () => {
  let service: SystemHealthStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemHealthStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
