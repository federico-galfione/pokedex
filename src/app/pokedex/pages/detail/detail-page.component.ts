import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseDirective } from 'src/app/shared/directives';
import { LoadingService } from 'src/app/shared/services';
import { Pokemon, PokemonMoveResource } from '../../models/Pokemon';
import { PokemonCacheService } from '../../services/pokemon-cache.service';
import { UserService } from '../../services/user.service';
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
  /**
   * Show just the first 5 moves.
   */
  get slicedMoves(): PokemonMoveResource[]{
    return this.pokemon?.moves.slice(0, 5).map(x => {
      x.move.name = x.move.name.split('-').join(' ');
      return x;
    });
  }

  get isInWishlist(){
    return this.userSvc.isInWishlist(this.pokemon.id);
  }

  get isCaught(){
    return this.userSvc.isCaught(this.pokemon.id);
  }


  constructor(private route: ActivatedRoute, 
    private pokemonCacheSvc: PokemonCacheService, 
    private loadingSvc: LoadingService, 
    private elementRef: ElementRef, 
    private toastrSvc: ToastrService,
    private userSvc: UserService,
    private router: Router
  ) { 
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
     ).subscribe({
       next: result => {
        this.pokemon = result
        this.setupColors(result);
       },
       error: error => {
        this.toastrSvc.error('You\'re gonna be redirect to the pokedex', 'Pokemon not found!');
        this.router.navigate(['']);
       }
     });
  }

  /**
   * Change the background colors behind the pokemon image
   * @param pokemon the current pokemon
   */
  setupColors(pokemon: Pokemon){
    if(pokemon){
      this.elementRef.nativeElement.style.setProperty('--second-type-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-tint`))
      this.elementRef.nativeElement.style.setProperty('--first-type-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-shade`))
    }
  }

  addToWishlist(){
    this.userSvc.isInWishlist(this.pokemon.id) ? this.userSvc.removeWishlistPokemon(this.pokemon.id) : this.userSvc.addWishlistPokemon(this.pokemon.id);
  }

  addToCaught(){
    this.userSvc.isCaught(this.pokemon.id) ? this.userSvc.removeCaughtPokemon(this.pokemon.id) : this.userSvc.addCaughtPokemon(this.pokemon.id);
  }

  goToPokedex(){
    this.router.navigate(['']);
  }
  
}
