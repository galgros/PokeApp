import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {E404Component} from "./e404/e404.component";
import {IndexComponent} from "./index/index.component";
import {PokemonComponent} from "./pokemon/pokemon.component";
import {PokedexComponent} from "./pokedex/pokedex.component";
import {SinglePokemonComponent} from "./single-pokemon/single-pokemon.component";
import {LoginComponent} from "./login/login.component";
import {ChooseCardsComponent} from "./choose-cards/choose-cards.component";
import {AuthGardService} from "./services/auth-guard.service";

const routes: Routes = [
  { path: "app-login", component: LoginComponent },
  { path: "app-index", component: IndexComponent },
  { path: "app-choose-cards", canActivate: [AuthGardService], component: ChooseCardsComponent },
  { path: "app-pokedex/:page", component: PokedexComponent },
  { path: "app-single-pokemon/:page/:id", component: SinglePokemonComponent },
  { path: "app-pokemon", component: PokemonComponent },
  { path: "", component: IndexComponent },
  { path: "**", component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
