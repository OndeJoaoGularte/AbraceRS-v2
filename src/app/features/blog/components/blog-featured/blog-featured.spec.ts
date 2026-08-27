import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFeatured } from './blog-featured';

describe('BlogFeatured', () => {
  let component: BlogFeatured;
  let fixture: ComponentFixture<BlogFeatured>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogFeatured],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogFeatured);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
