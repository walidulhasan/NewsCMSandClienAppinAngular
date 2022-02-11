import { TestBed } from '@angular/core/testing';

import { PreviousrouteService } from './previousroute.service';

describe('PreviousrouteService', () => {
  let service: PreviousrouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousrouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
