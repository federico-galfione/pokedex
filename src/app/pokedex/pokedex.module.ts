import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonTypeComponent } from './components/pokemon-type-icon/pokemon-type.component';
import { DetailPageComponent } from './pages/detail/detail-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokemonStatComponent } from './components/pokemon-stat/pokemon-stat.component';


@NgModule({
  declarations: [
    ListPageComponent,
    PokemonItemComponent,
    PokemonTypeComponent,
    DetailPageComponent,
    PokemonStatComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule,
    FormsModule,
    SharedModule
  ]
})
export class PokedexModule { }
