import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pokemon } from '../models/Pokemon';
import { PokedexService } from './pokedex.service';

@Injectable({
  providedIn: 'root'
})
/**
 * PokeAPI seems relatively big and complex and a lot of times it returns urls to retrieve new information.
 * To improve the application performances I use a cache service to save every information already retrieved.
 * Seems unluckily that a pokemon information is changed during an user session, so this shouldn't interfer
 * with the user experience.
 */
export class PokemonCacheService extends PokedexService {
  private pokemonCacheByName: {[key: string]: Pokemon} = {};
  private pokemonCacheById: {[key: number]: Pokemon} = {};
  public get pagination(){
    return super.infoPagination;
  }

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  /**
   * This method expose the PokedexService and calls for each result getPokemon.
   * So for each pokemon I start to get its information and return the Observable.
   * 
   * @returns return a an observable of lists of observables of pokemon
   */
  public getPokemonPage(pageNumber: number = 0): Observable<Array<Observable<Pokemon>>> {
      return super.getPokemonPageFromApi(pageNumber).pipe(
        map(page => page.results.map(info => this.getPokemon(info.name)))
      )
  }

  /**
   * Try to get a Pokemon from the cache, if there's no pokemon call the service
   * 
   * @param nameOrNumber The name or the number of the pokemon
   * @returns an observable of a Pokemon
   */
  public getPokemon(nameOrNumber: string): Observable<Pokemon>{
    nameOrNumber = nameOrNumber.trim().toLowerCase();
    const rightCache = isNaN(+nameOrNumber) ? this.pokemonCacheByName : this.pokemonCacheById;
    const key = nameOrNumber;
    return rightCache[key] 
      ? of(rightCache[key]) 
      : this.getPokemonFromApi(key)
          .pipe(
            tap(pokemon => {
              this.addPokemonToCache(pokemon)
              console.log(Object.keys(this.pokemonCacheByName).length);
            })
          );
  }

  /**
   * Add a pokemon to the cache
   */
  private addPokemonToCache(pokemon: Pokemon){
    this.pokemonCacheById[pokemon.id] = pokemon;
    this.pokemonCacheByName[pokemon.name] = pokemon;
  }

  /**
   * Add a pokemon to the cache
   */
   private resetCache(){
    this.pokemonCacheById = {};
    this.pokemonCacheByName = {};
  }

}
