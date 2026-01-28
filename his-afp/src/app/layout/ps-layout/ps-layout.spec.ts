import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLayout } from './ps-layout';

describe('PsLayout', () => {
  let component: PsLayout;
  let fixture: ComponentFixture<PsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
