import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { LoadingService } from 'src/app/shared/services';
import { pokemon } from 'src/app/util/test-values';
import { PokemonCacheService } from '../../services/pokemon-cache.service';
import { UserService } from '../../services/user.service';
import { ListPageComponent } from './list-page.component';


describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let mockPokemonCacheSvc;
  let mockUserSvc;
  let mockLoadingSvc;
  let mockToastrSvc;
  let mockRouter;
  let fixture: ComponentFixture<ListPageComponent>;

  mockPokemonCacheSvc = jasmine.createSpyObj(["getPokemon","getPokemonPage"]);
  mockLoadingSvc = jasmine.createSpyObj(["startLoading", "getLoading"]);
  mockUserSvc = jasmine.createSpyObj(["removeWishlistPokemon", "addWishlistPokemon", "removeCaughtPokemon", "addCaughtPokemon"]);
  mockToastrSvc = jasmine.createSpyObj(["error","success"]);
  mockRouter = jasmine.createSpyObj(["navigate"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPageComponent ],
      providers: [
        { provide: PokemonCacheService, useValue: mockPokemonCacheSvc },
        { provide: UserService, useValue: mockUserSvc },
        { provide: LoadingService, useValue: mockLoadingSvc },
        { provide: ToastrService, useValue: mockToastrSvc },
        { provide: Router, useValue: mockRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockLoadingSvc.startLoading.and.returnValue(of([of(pokemon),of(pokemon),of(pokemon)]))
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
