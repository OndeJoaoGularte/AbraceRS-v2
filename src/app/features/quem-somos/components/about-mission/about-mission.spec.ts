import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMission } from './about-mission';

describe('AboutMission', () => {
  let component: AboutMission;
  let fixture: ComponentFixture<AboutMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMission],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
