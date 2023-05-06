import { TestBed } from '@angular/core/testing';

import { FCServiceService } from './fc-service.service';

describe('FCServiceService', () => {
  let service: FCServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FCServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
