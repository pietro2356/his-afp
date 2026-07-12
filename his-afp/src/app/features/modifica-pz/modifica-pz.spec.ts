import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ModificaPz } from './modifica-pz';

describe('ModificaPz', () => {
  let component: ModificaPz;
  let fixture: ComponentFixture<ModificaPz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaPz, HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaPz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a warning when the form is submitted invalid', () => {
    component.onSubmit();
    fixture.detectChanges();

    expect(component.submitted).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('Compila tutti i campi obbligatori');
  });
});
