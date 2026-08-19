import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transparency } from './transparency';

describe('Transparency', () => {
  let component: Transparency;
  let fixture: ComponentFixture<Transparency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transparency],
    }).compileComponents();

    fixture = TestBed.createComponent(Transparency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
