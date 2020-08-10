import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { E404Component } from './e404/e404.component';
import { IndexComponent } from './index/index.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PokemonComponent } from './pokemon/pokemon.component';
import {CardService} from "./services/card.service";
import { PokedexComponent } from './pokedex/pokedex.component';
import { SinglePokemonComponent } from './single-pokemon/single-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    E404Component,
    IndexComponent,
    PokemonComponent,
    PokedexComponent,
    SinglePokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
