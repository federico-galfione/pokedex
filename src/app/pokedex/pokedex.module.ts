import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PokedexRoutingModule } from './pokedex-routing.module';



@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
