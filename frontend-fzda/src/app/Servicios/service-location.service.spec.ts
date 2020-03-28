import { TestBed } from '@angular/core/testing';

import { ServiceLocationService } from './service-location.service';

describe('ServiceLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceLocationService = TestBed.get(ServiceLocationService);
    expect(service).toBeTruthy();
  });
});
