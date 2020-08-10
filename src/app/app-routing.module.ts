import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {E404Component} from "./e404/e404.component";
import {IndexComponent} from "./index/index.component";
import {PokemonComponent} from "./pokemon/pokemon.component";
import {PokedexComponent} from "./pokedex/pokedex.component";
import {SinglePokemonComponent} from "./single-pokemon/single-pokemon.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "app-index", component: IndexComponent },
  { path: "app-pokedex/:page", component: PokedexComponent },
  { path: "app-single-pokemon", component: SinglePokemonComponent },
  { path: "app-pokemon", component: PokemonComponent },
  { path: "**", component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
