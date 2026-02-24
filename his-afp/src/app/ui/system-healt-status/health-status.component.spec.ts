import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthStatus } from './health-status.component';

describe('SystemHealtStatus', () => {
  let component: HealthStatus;
  let fixture: ComponentFixture<HealthStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
