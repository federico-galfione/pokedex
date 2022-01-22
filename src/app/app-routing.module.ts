import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Even if this is just an application with 2 pages,
 * I always prefer to let app-routing.module route to modules and not directly to the pages
 * (that is a duty of each single module).
 * If I'm gonna add a new module in the future I just need to add the path here and change
 * the routing module of the added module, without changing the previous routes inserted here.
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pokedex/pokedex.module').then((m) => m.PokedexModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
