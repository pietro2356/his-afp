import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePz } from './table-pz';

describe('TablePz', () => {
  let component: TablePz;
  let fixture: ComponentFixture<TablePz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
