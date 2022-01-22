import { PokeapiResource } from './PokeapiResource';

/**
 * Simplified interfaces to manage API data.
 * https://github.com/monbrey/pokeapi-typescript
 */

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    sprites: PokemonSprites;
    types: {
        slot: number,
        type: PokeapiResource<Type, PokemonTypeName>
    }[];
    moves?: PokemonMoveResource[];
    stats?: PokemonStat[];
}

export interface PokemonMoveResource {
    move: PokeapiResource<Move>;
}

export interface Move {
    id: number;
    name: string;
    accuracy: number;
    effect_chance: number;
    pp: number;
    priority: number;
    power: number;
    generation: PokeapiResource<Generation>;
}

export interface Generation{
    id: number;
    name: string;
}

export interface Type {
    id: number;
    name: string;
    damage_relations: TypeRelations;
}

export interface TypeRelations {
    no_damage_to: Array<PokeapiResource<Type>>;
    half_damage_to: Array<PokeapiResource<Type>>;
    double_damage_to: Array<PokeapiResource<Type>>;
    no_damage_from: Array<PokeapiResource<Type>>;
    half_damage_from: Array<PokeapiResource<Type>>;
    double_damage_from: Array<PokeapiResource<Type>>;
}

export interface PokemonSprites{
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
    other: any;
}

export interface PokemonStat {
    stat: PokeapiResource<Stat>;
    effort: number;
    base_stat: number;
}

export interface Stat {
    id: number;
    name: string;
    name_index: number;
}