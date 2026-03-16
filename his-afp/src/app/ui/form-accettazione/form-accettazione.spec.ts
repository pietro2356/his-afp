import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccettazione } from './form-accettazione';

describe('FormAccettazione', () => {
  let component: FormAccettazione;
  let fixture: ComponentFixture<FormAccettazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAccettazione],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAccettazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
