import { TestBed } from '@angular/core/testing';

import { CeldasService } from './celdas.service';

describe('CeldasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CeldasService = TestBed.get(CeldasService);
    expect(service).toBeTruthy();
  });
});
