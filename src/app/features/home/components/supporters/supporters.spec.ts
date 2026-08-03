import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supporters } from './supporters';

describe('Supporters', () => {
  let component: Supporters;
  let fixture: ComponentFixture<Supporters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supporters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supporters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
