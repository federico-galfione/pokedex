import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseDirective } from 'src/app/shared/directives';
import { LoadingService } from 'src/app/shared/services';
import { Pokemon } from '../../models/Pokemon';
import { PokemonCacheService } from '../../services/pokemon-cache.service';
const DetailPageLoadingKeys = {
  getPokemon: 'GET_POKEMON'
}

@Component({
  selector: 'poke-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent extends BaseDirective implements OnInit {
  pokemon: Pokemon;

  constructor(private route: ActivatedRoute, 
    private pokemonCacheSvc: PokemonCacheService, 
    private loadingSvc: LoadingService, 
    private elementRef: ElementRef, 
    private toastrSvc: ToastrService,
    private router: Router
  ) { 
    super();
  }

  ngOnInit(): void {
    /**
     * At this point the pokemon is already in cache, if we started from the list page.
     * In the case we write directly the url the pokemon will be get from the api.
     * That's why I ensure that the call is inside the loading service.
     */
     this.loadingSvc
     .startLoading(
       this,
       DetailPageLoadingKeys.getPokemon,
       this.pokemonCacheSvc.getPokemon(this.route.snapshot.paramMap.get('id')),
       {
         message: 'I\'m getting your Pokemon!',
       }
     ).subscribe({
       next: result => {
        this.pokemon = result
        this.setupColors(result);
       },
       error: error => {
        this.toastrSvc.error('You\'re gonna be redirect to the pokedex', 'Pokemon not found!');
        this.router.navigate(['']);
       }
     });
  }

  setupColors(pokemon: Pokemon){
    if(pokemon){
      this.elementRef.nativeElement.style.setProperty('--second-type-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-tint`))
      this.elementRef.nativeElement.style.setProperty('--first-type-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-shade`))
    }
  }
}
