import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDirective } from 'src/app/shared/directives/base.directive';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Pokemon } from '../../models/Pokemon';
import { PokemonCacheService } from '../../services/pokemon-cache.service';
const ListPageLoadingKeys = {
  getPage: 'GET_PAGE'
}

@Component({
  selector: 'poke-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent extends BaseDirective implements OnInit {

  pokemonsPage: Array<Observable<Pokemon>> | null = null;
  /**
   * When true a page is loading, so I have to disable the paginator
   */
  isLoadingPage$: Observable<boolean>;
  /**
   * The value in the search input.
   * 
   * P.S. I usually prefer Reactive Forms instead Template Driven, but with just one field it would be an overkill
   */
  searchValue: string;

  constructor(public pokemonCacheSvc: PokemonCacheService, private loadingSvc: LoadingService) { 
    super()
    this.isLoadingPage$ = this.loadingSvc.getLoading(this, ListPageLoadingKeys.getPage)
    this.loadPage()
  }

  ngOnInit(): void {
  }

  goToDetail(nameOrNumber: string){
    this.loadingSvc
        .startLoading(
          this,
          ListPageLoadingKeys.getPage,
          this.pokemonCacheSvc.getPokemon(nameOrNumber),
          {
            message: 'I\'m looking for your Pokemon!',
          }
        ).subscribe({
          next: response => console.log('Pokemon found!'),
          error: err => console.error('Pokemon not found!')
        })
  }

  loadPage(pageIndex: number = 0){  
    this.loadingSvc
        .startLoading(
          this,
          ListPageLoadingKeys.getPage,
          this.pokemonCacheSvc.getPokemonPage(pageIndex),
          {
            message: 'I\'m getting new Pokemon!',
          }
        ).subscribe(x => this.pokemonsPage = x);
  }

}
