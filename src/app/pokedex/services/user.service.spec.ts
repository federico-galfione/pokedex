import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('addCaughtPokemon', () => {
    it('should add value in localStorage', () => {
      service.addCaughtPokemon(100);
      service.caughtList$.subscribe(val => expect(val).toContain('100'))
    })
  })
});
