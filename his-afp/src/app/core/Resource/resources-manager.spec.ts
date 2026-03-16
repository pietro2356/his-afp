import { TestBed } from '@angular/core/testing';

import { ResourcesManager } from './resources-manager';

describe('ResourcesManager', () => {
  let service: ResourcesManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
