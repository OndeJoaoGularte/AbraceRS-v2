import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeam } from './about-team';

describe('AboutTeam', () => {
  let component: AboutTeam;
  let fixture: ComponentFixture<AboutTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
