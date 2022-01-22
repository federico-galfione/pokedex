import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonTypeComponent } from './components/pokemon-type-icon/pokemon-type.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PokedexRoutingModule } from './pokedex-routing.module';


@NgModule({
  declarations: [
    ListPageComponent,
    PokemonItemComponent,
    PokemonTypeComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class PokedexModule { }
