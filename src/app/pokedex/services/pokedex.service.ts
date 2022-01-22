import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PokeapiGenericPage } from '../models/PokeapiGenericPage';
import { Pokemon } from '../models/Pokemon';

/**
 * This is not a real Angular Service cause it's not provided,
 * 
 * This service has the duty to interact with the Pokedex API
 * Every method in this service is called by PokemonCacheService (its subclass),
 * that manage the pokemons' information
 */
export class PokedexService {

  //The next page to be called
  private nextPokemonPage: string | null = null;
  constructor(private http: HttpClient) { }

  /**
   * Get a paginated list of pokemon
   * 
   * @returns Returns an observable of Pokemon
   */
  protected getPokemonPageFromApi(){
    return this.http.get<PokeapiGenericPage<Pokemon>>(this.nextPokemonPage ?? `api/pokemon`);
  }

  protected getPokemonFromApi(numberOrName: string){
    return this.http.get<Pokemon>(`api/pokemon/${numberOrName}`)
      .pipe(
        map(result => {
          return  {
            id: result.id,
            name: result.name,
            base_experience: result.base_experience,
            height: result.height,
            is_default: result.is_default,
            order: result.order,
            weight: result.weight,
            moves: result.moves,
            sprites: result.sprites,
            stats: result.stats,
            types: result.types
          }
        })
      )
  }

}
