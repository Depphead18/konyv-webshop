import { TestBed } from '@angular/core/testing';

import { TbrServiceService } from './tbr-service.service';

describe('TbrServiceService', () => {
  let service: TbrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
