import { TestBed } from '@angular/core/testing';

import { ServiceCookieService } from './service-cookie.service';

describe('ServiceCookieService', () => {
  let service: ServiceCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
