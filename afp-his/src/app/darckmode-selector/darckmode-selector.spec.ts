import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarckmodeSelector } from './darckmode-selector';

describe('DarckmodeSelector', () => {
  let component: DarckmodeSelector;
  let fixture: ComponentFixture<DarckmodeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarckmodeSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarckmodeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
