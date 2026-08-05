import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Associate } from './associate';

describe('Associate', () => {
  let component: Associate;
  let fixture: ComponentFixture<Associate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Associate],
    }).compileComponents();

    fixture = TestBed.createComponent(Associate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
