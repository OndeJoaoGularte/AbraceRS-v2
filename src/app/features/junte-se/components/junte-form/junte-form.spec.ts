import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunteForm } from './junte-form';

describe('JunteForm', () => {
  let component: JunteForm;
  let fixture: ComponentFixture<JunteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JunteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(JunteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
