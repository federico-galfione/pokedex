import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private wishlistKey = 'wishlist';
  private caughtKey = 'caught';
  private caughtList = new BehaviorSubject<string[]>([]);
  private wishlist = new BehaviorSubject<string[]>([]);
  public caughtList$ = this.caughtList.asObservable();
  public wishlist$ = this.wishlist.asObservable();

  constructor() {
    this.getCaughtPokemonsFromLocalStorage();
    this.getWishlistPokemonsFromLocalStorage();
  }

  addCaughtPokemon(pokemonId: number){
    this.caughtList.next([...this.caughtList.value, pokemonId.toString()]);
    this.caughtListFromArrayToLocalStorage();
  }
  addWishlistPokemon(pokemonId: number){
    this.wishlist.next([...this.wishlist.value, pokemonId.toString()]);
    this.wishlistFromArrayToLocalStorage();
  }

  removeCaughtPokemon(pokemonId: number){
    this.caughtList.next(this.caughtList.value.filter(x => x !== (pokemonId.toString())));
    this.caughtListFromArrayToLocalStorage();
  }
  removeWishlistPokemon(pokemonId: number){
    this.wishlist.next(this.wishlist.value.filter(x => x !== (pokemonId.toString())));
    this.wishlistFromArrayToLocalStorage();
  }

  isCaught(pokemonId: number){
    return this.caughtList.value.includes(pokemonId.toString())
  }

  isInWishlist(pokemonId: number){
    return this.wishlist.value.includes(pokemonId.toString())
  }

  private getCaughtPokemonsFromLocalStorage(){
    this.caughtList.next(localStorage.getItem(this.caughtKey)?.split('-').filter(x => x !== '') ?? []);
  }

  private getWishlistPokemonsFromLocalStorage(){
    this.wishlist.next(localStorage.getItem(this.wishlistKey)?.split('-').filter(x => x !== '') ?? []);
  }

  private wishlistFromArrayToLocalStorage(){
    localStorage.setItem(this.wishlistKey, this.wishlist.value.join('-'))
  }

  private caughtListFromArrayToLocalStorage(){
    localStorage.setItem(this.caughtKey, this.caughtList.value.join('-'))
  }
}
