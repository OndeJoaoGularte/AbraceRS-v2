import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTransparency } from './about-transparency';

describe('AboutTransparency', () => {
  let component: AboutTransparency;
  let fixture: ComponentFixture<AboutTransparency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTransparency],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTransparency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
