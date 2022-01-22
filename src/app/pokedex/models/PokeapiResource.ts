/**
 * This is a generic resource returned by Pokeapi.
 * It contains a name and a url to the actual resource.
 * The first generic (even if it's not used) keeps track on what I will receive if I call the url
 * The second Generic is used to typing the name if needed
 */
export interface PokeapiResource<T = null, G = string>{
    name: G;
    url: string;
}