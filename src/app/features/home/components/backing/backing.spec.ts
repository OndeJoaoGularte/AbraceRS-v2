import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Backing } from './backing';

describe('Backing', () => {
  let component: Backing;
  let fixture: ComponentFixture<Backing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Backing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Backing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
