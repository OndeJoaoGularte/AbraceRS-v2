import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtuamosTimeline } from './atuamos-timeline';

describe('AtuamosTimeline', () => {
  let component: AtuamosTimeline;
  let fixture: ComponentFixture<AtuamosTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtuamosTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(AtuamosTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
