import { PokeapiResource } from './PokeapiResource';

export interface PokeapiGenericPage<T = null, G = string>{
    count: number;
    next: string;
    previous: string;
    itemsPerPage?: number;
    results: Array<PokeapiResource<T, G>>;
}