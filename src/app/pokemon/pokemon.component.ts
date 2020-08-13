import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {FormBuilder} from "@angular/forms";
import {CardService} from "../services/card.service";
import {bgColorService} from "../services/bgColor.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  title = this.appComponent.title;
  form;

  id;
  pokemon = null;
  i;
  bgColorService = new bgColorService();

  constructor(
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      nameOrNumber: ""
    })
  }

  ngOnInit(): void {
    this.searchPokemon({'nameOrNumber': this.getRandomNumber()})
  }

  searchPokemon(value) {
    this.pokemon = this.cardService.searchPokemon(value);
    return this.router.navigate(["/app-pokemon"]);
  }

  getRandomNumber() {
    return this.cardService.getRandomNumber(800);
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }
}
