import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'poke-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnChanges {
  @Input()
  pokemon: Pokemon | null = null;
  /**
   * Emit the pokemon id as a string
   */
  @Output()
  pokemonClick: EventEmitter<string> = new EventEmitter<string>()

  constructor(private elementRef: ElementRef) { 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.pokemon){
        this.elementRef.nativeElement.style.setProperty('--main-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-tint`))
        this.elementRef.nativeElement.style.setProperty('--shade-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-shade`))
      }
  }

  pokemonClicked(){
    this.pokemonClick.emit(this.pokemon.id.toString());
  }

  imgNotFound(){
    this.pokemon.sprites.other['official-artwork'].front_default = '/assets/no-img-placeholder.png'
  }
}
