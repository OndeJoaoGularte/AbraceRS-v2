import { TestBed } from '@angular/core/testing';

import { Supporters } from './supporters';

describe('Supporters', () => {
  let service: Supporters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supporters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
