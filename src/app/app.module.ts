import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { E404Component } from './e404/e404.component';
import { IndexComponent } from './index/index.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PokemonComponent } from './pokemon/pokemon.component';
import {CardService} from "./services/card.service";
import { PokedexComponent } from './pokedex/pokedex.component';
import { SinglePokemonComponent } from './single-pokemon/single-pokemon.component';
import {bgColorService} from "./services/bgColor.service";
import { LoginComponent } from './login/login.component';
import {AuthGardService} from "./services/auth-guard.service";
import { ChooseCardsComponent } from './choose-cards/choose-cards.component';
import {PlayerService} from "./services/player.service";
import {RouterTestingModule} from "@angular/router/testing";

@NgModule({
  declarations: [
    AppComponent,
    E404Component,
    IndexComponent,
    PokemonComponent,
    PokedexComponent,
    SinglePokemonComponent,
    LoginComponent,
    ChooseCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterTestingModule,
  ],
  providers: [
    CardService,
    FormBuilder,
    bgColorService,
    AuthGardService,
    PlayerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
