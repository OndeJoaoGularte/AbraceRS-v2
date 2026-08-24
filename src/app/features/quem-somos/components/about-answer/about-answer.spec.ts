import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAnswer } from './about-answer';

describe('AboutAnswer', () => {
  let component: AboutAnswer;
  let fixture: ComponentFixture<AboutAnswer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutAnswer],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutAnswer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
