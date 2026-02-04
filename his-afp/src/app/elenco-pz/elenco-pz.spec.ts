import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoPz } from './elenco-pz';

describe('ElencoPz', () => {
  let component: ElencoPz;
  let fixture: ComponentFixture<ElencoPz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElencoPz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencoPz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
