import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLecture } from './form-lecture';

describe('FormLecture', () => {
  let component: FormLecture;
  let fixture: ComponentFixture<FormLecture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLecture],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLecture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
