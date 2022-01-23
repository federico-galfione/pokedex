import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PokemonCacheService } from './pokemon-cache.service';

/**
 * Rememeber that this is not an Angular Service.
 * I could move the testing directly into PokemonCache.
 */
describe('PokedexService', () => {
  let service: PokemonCacheService;
  let httpTestingController: HttpTestingController;
  let mockRouter;


  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(["navigate"])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: mockRouter }]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonCacheService);
  });
});
