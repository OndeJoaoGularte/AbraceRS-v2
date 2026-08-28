import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunteSe } from './junte-se';

describe('JunteSe', () => {
  let component: JunteSe;
  let fixture: ComponentFixture<JunteSe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JunteSe],
    }).compileComponents();

    fixture = TestBed.createComponent(JunteSe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
