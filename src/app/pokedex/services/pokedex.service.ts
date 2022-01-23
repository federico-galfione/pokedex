import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokeapiGenericPage } from '../models/PokeapiGenericPage';
import { Pokemon } from '../models/Pokemon';
const ELEMENTS_PER_PAGE = 20;

/**
 * This is not a real Angular Service cause it's not provided,
 * 
 * This service has the duty to interact with the Pokedex API
 * Every method in this service is called by PokemonCacheService (its subclass),
 * that manage the pokemons' information
 */
export class PokedexService {

  //The next page to be called
  private _infoPagination: { count: number, itemsPerPage: number } | null = null;
  protected get infoPagination(){
    return this._infoPagination;
  }
  private set infoPagination(value){
    this._infoPagination = value;
  }
  constructor(private http: HttpClient) { }

  /**
   * Get a paginated list of pokemon
   * 
   * @param forward If true take the next page, if false the previous one
   * @returns Returns an observable of Pokemon
   */
  protected getPokemonPageFromApi(pageNumber: number){
    console.log(environment.baseApiUrl);
    return this.http.get<PokeapiGenericPage<Pokemon>>(`${environment.baseApiUrl}/pokemon?offset=${pageNumber * ELEMENTS_PER_PAGE}&limit=20`)
      .pipe(tap(
        result => this.infoPagination = { count: result.count, itemsPerPage: ELEMENTS_PER_PAGE }
      ));
  }

  /**
   * Call the api and gets the pokemon rapresented bt numberOrName
   * 
   * @param numberOrName the id of the pokemon (name or number)
   * @returns Returns a specific pokemon
   */
  protected getPokemonFromApi(numberOrName: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${environment.baseApiUrl}/pokemon/${numberOrName}`)
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
