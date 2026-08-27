import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPosts } from './blog-posts';

describe('BlogPosts', () => {
  let component: BlogPosts;
  let fixture: ComponentFixture<BlogPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPosts],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
