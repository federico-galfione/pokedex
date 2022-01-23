import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'poke-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnChanges {
  @Input()
  pokemon: Pokemon | null = null;
  /**
   * Emit the pokemon id as a string
   */
  @Output()
  pokemonClick: EventEmitter<number> = new EventEmitter<number>()
  @Output()
  addWishlistClick: EventEmitter<number> = new EventEmitter<number>()
  @Output()
  addCaughtClick: EventEmitter<number> = new EventEmitter<number>()

  constructor(private elementRef: ElementRef, private userSvc: UserService) { 
    
  }

  get isInWishlist(){
    return this.userSvc.isInWishlist(this.pokemon.id);
  }

  get isCaught(){
    return this.userSvc.isCaught(this.pokemon.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.pokemon){
        this.elementRef.nativeElement.style.setProperty('--main-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-tint`))
        this.elementRef.nativeElement.style.setProperty('--shade-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-shade`))
      }
  }

  pokemonClicked(){
    this.pokemonClick.emit(this.pokemon.id);
  }

  addWishlist(){
    this.addWishlistClick.emit(this.pokemon.id);
  }

  addCaught(){
    this.addCaughtClick.emit(this.pokemon.id);
  }

  imgNotFound(){
    this.pokemon.sprites.other['official-artwork'].front_default = '/assets/no-img-placeholder.png'
  }
}
