import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private pokemonCacheSvc: PokemonCacheService, private loadingSvc: LoadingService) { 
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
     ).subscribe(result => this.pokemon = result);
  }
}
