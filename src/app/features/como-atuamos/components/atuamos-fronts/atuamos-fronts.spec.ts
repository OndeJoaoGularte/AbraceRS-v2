import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtuamosFronts } from './atuamos-fronts';

describe('AtuamosFronts', () => {
  let component: AtuamosFronts;
  let fixture: ComponentFixture<AtuamosFronts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtuamosFronts],
    }).compileComponents();

    fixture = TestBed.createComponent(AtuamosFronts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
