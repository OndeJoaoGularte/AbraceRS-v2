import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunteSelection } from './junte-selection';

describe('JunteSelection', () => {
  let component: JunteSelection;
  let fixture: ComponentFixture<JunteSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JunteSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(JunteSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
