import { TestBed } from '@angular/core/testing';

import { VehiculosParqueadosService } from './vehiculos-parqueados.service';

describe('VehiculosParqueadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiculosParqueadosService = TestBed.get(VehiculosParqueadosService);
    expect(service).toBeTruthy();
  });
});
