import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StatoServizi } from './stato-servizi';

describe('StatoServizi', () => {
  let component: StatoServizi;
  let fixture: ComponentFixture<StatoServizi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatoServizi, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatoServizi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the system status heading and service state', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Stato dei servizi');
    expect(text).toContain('UNAVAILABLE');
  });
});
