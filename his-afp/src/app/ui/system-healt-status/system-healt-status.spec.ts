import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemHealtStatus } from './system-healt-status';

describe('SystemHealtStatus', () => {
  let component: SystemHealtStatus;
  let fixture: ComponentFixture<SystemHealtStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemHealtStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemHealtStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
