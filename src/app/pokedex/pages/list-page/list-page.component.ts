import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/Pokemon';
import { PokemonCacheService } from '../../services/pokemon-cache.service';

@Component({
  selector: 'poke-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  pokemonsPage: Array<Observable<Pokemon>> | null = null;

  constructor(private pokemonCacheSvc: PokemonCacheService) { 
    this.pokemonCacheSvc.getPokemonPage().subscribe(x => this.pokemonsPage = x);
  }

  ngOnInit(): void {
  }

}
