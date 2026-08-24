import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtuamosProjects } from './atuamos-projects';

describe('AtuamosProjects', () => {
  let component: AtuamosProjects;
  let fixture: ComponentFixture<AtuamosProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtuamosProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(AtuamosProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
