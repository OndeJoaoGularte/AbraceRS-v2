import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGallery } from './custom-gallery';

describe('CustomGallery', () => {
  let component: CustomGallery;
  let fixture: ComponentFixture<CustomGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
