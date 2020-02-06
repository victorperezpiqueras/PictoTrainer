/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HolaMundoService } from './hola-mundo-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: HolaMundoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HolaMundoService]
    });
  });

  it('should ...', inject([HolaMundoService], (service: HolaMundoService) => {
    expect(service).toBeTruthy();
  }));
});
