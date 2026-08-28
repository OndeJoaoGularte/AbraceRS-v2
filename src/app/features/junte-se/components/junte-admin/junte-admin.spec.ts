import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunteAdmin } from './junte-admin';

describe('JunteAdmin', () => {
  let component: JunteAdmin;
  let fixture: ComponentFixture<JunteAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JunteAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(JunteAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
