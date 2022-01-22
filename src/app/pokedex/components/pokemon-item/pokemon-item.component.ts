import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'poke-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnChanges {
  @Input()
  pokemon: Pokemon | null = null;

  get nationalNumber(){
    let num = this.pokemon?.id.toString();
    if(!num)
      return "#000";
    while (num.length < 3) num = "0" + num;
    return '#' + num;
  }

  constructor(private elementRef: ElementRef) { 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.pokemon){
        this.elementRef.nativeElement.style.setProperty('--main-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-tint`))
        this.elementRef.nativeElement.style.setProperty('--shade-color', getComputedStyle(document.documentElement).getPropertyValue(`--${this.pokemon?.types[0].type.name}-type-color-shade`))
      }
  }
}
