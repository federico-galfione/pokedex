import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { PokemonStat } from '../../models/Pokemon';

@Component({
  selector: 'poke-pokemon-stat',
  templateUrl: './pokemon-stat.component.html',
  styleUrls: ['./pokemon-stat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonStatComponent implements AfterViewInit {
  @Input()
  stat: PokemonStat;
  @Input()
  type: PokemonTypeName;

  public mapInitials = {
    "hp": "HP",
    "attack": "ATK",
    "defense": "DEF",
    "special-attack": "SA",
    "special-defense": "SD",
    "speed": "SP"
  }

  get value(){
    if(this.stat?.base_stat){
      return this.stat?.base_stat / 2;
    }
    return 20;
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    document.documentElement.style.setProperty('--current-progress-bar-color', getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--color'));
  }
}
