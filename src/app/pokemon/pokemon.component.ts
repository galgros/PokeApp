import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {FormBuilder} from "@angular/forms";
import {CardService} from "../services/card.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from 'jquery';
import {bgColorService} from "../services/bgColor.service";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  title = this.appComponent.title;
  form;

  id;
  pkm = null;
  species = [];
  type = [];
  abilities = [];
  i;
  bgColorService = new bgColorService();

  constructor(
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      nameOrNumber: ""
    })
  }

  ngOnInit(): void {
    this.searchPokemon({'nameOrNumber': this.getRandom()})
  }

  searchPokemon(value) {
    console.log(value)
    const doc = this;
    const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + value.nameOrNumber;
    this.pkm = [];
    this.abilities = [];
    this.species = [];
    this.type = [];

    $.getJSON(pokeURL, function (data) {
      setTimeout(() => {
        doc.getSpecies(data.species.url);
        doc.getAbilities(data.abilities[0].ability.url);
        doc.getAbilities(data.abilities[1].ability.url);
        doc.getType(data.types[0]?.type.url);
      }, 1000);
      doc.pkm.push({"info": data, "type": doc.type, "species": doc.species, 'abilities': doc.abilities});
    });
    this.router.navigate(["/app-pokemon"]);
  }

  getSpecies(url) {
    const doc = this

    $.getJSON(url, function (data) {
      doc.species.push(data);
    });
  }

  getType(url) {
    const doc = this;
    $.getJSON(url, function (data: object) {
      doc.type.push(data);
    });
  }

  getAbilities(url) {
    const doc = this;
    $.getJSON(url, function (data: object) {
      doc.abilities.push(data);
    });
  }

  getRandom() {
    return Math.floor(Math.random() * 800);
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }
}
