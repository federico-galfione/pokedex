import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'poke-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.scss']
})
export class PokemonTypeComponent {
  @Input()
  mode: 'icon' | 'text' = 'icon';
  @Input()
  type: PokemonTypeName = "normal";

  @HostBinding('class')
  get classes(){
    return this.mode + ' ' + this.type;
  }

  constructor() { }

}
