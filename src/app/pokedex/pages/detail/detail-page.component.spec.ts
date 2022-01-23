import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { NationalNumPipe } from 'src/app/shared/pipes/national-num.pipe';
import { LoadingService } from 'src/app/shared/services';
import { pokemon } from 'src/app/util/test-values';
import { PokemonCacheService } from '../../services/pokemon-cache.service';
import { DetailPageComponent } from './detail-page.component';


describe('DetailComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let mockPokemonCacheSvc; 
  let mockLoadingSvc;
  let mockToastrSvc;
  let mockRouter;
  beforeEach(async () => {
    mockPokemonCacheSvc = jasmine.createSpyObj(["getPokemon"])
    mockLoadingSvc = jasmine.createSpyObj(["startLoading"])
    mockToastrSvc = jasmine.createSpyObj(["error"])
    mockRouter = jasmine.createSpyObj(["navigate"])
    await TestBed.configureTestingModule({
      declarations: [ DetailPageComponent, NationalNumPipe ],
      providers: [
        {provide: PokemonCacheService, useValue: mockPokemonCacheSvc},
        {provide: LoadingService, useValue: mockLoadingSvc},
        {provide: ToastrService, useValue: mockToastrSvc},
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: { snapshot: {paramMap: {get: (id: string) => 3}}}}
      ]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    mockLoadingSvc.startLoading.and.returnValue(of(pokemon))
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
