import { TestBed } from '@angular/core/testing';
import { SupportersService } from './supporters';

describe('SupportersService', () => {
  let service: SupportersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
