import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon = [];
  resultPage = 1;
  resultLimit = 15;
  response = [];
  description = [];

  constructor(private appComponent: AppComponent, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const page = this.route.snapshot.params['page'];
    this.resultPage = +page;
    this.searchList();
  }

  searchList() {
    const param =
      "?offset=" +
      (this.resultLimit * this.resultPage - this.resultLimit) +
      "&limit=" + this.resultLimit;
    const pokeURL = "http://pokeapi.co/api/v2/pokemon" + param;
    const doc = this;

    $.getJSON(pokeURL, function(data){
      doc.getPokemons(data.results);
    });
  }

  getPokemons(data) {

    this.pokemon = [];
    const doc = this;

    for (let pokemon of data) {
      $.getJSON(pokemon.url, function(data){
        setTimeout(()=>{
          doc.pkmInfoRequest(data.abilities[0]?.ability.url);
          doc.pkmInfoRequest(data.abilities[1]?.ability.url);
          doc.pkmDescriptionRequest(data.species.url);
        },500)
        doc.pokemon.push({
          "name": pokemon.name,
          "abilities" : [
            doc.response
          ],
          "description": [doc.description],
          "info": data
        });
      });
    }
    console.log(this.pokemon)
    this.router.navigate(["/app-pokedex/" + this.resultPage])
  }

  pkmInfoRequest(url){
    const doc = this;
   $.getJSON(url, function(data: object){
     doc.response.push(data);
   });
  }

  pkmDescriptionRequest(url){
    const doc = this;
    $.getJSON(url, function(data: object){
      doc.description.push(data);
    });
  }

  onNextPage(nbPage) {
    this.resultPage+=nbPage;
    this.response = [];
    this.description = [];
    this.searchList();
  }

  onPreviousPage(nbPage) {
    this.resultPage-=nbPage;
    this.response = [];
    this.description = [];
    this.searchList();
  }

  getBgColor(type) {
    switch (type) {
      case "grass":
        return "#dbfba9"
      case "bug":
        return "#d9ea7b"
      case "fire":
        return "#efbf68"
      case "water":
        return "#b3c8da"
      case "ice":
        return "#b3c8da"
      case "psychic":
        return "#fdfd9c"
      case "electric":
        return "#fdfd9c"
      case "poison":
        return "#f1cff1"
      case "ghost":
        return "#f1cff1"
      case "fairy":
        return "pink"
      case "fighting":
        return "#caa37c"
      case "ground":
        return "#caa37c"
      case "dark":
        return "#444444"
      case "rock":
        return "#afafaf"
      case "steel":
        return "#bdbdbd"
      default :
        return "#ffd9b9"
    }
  }
}
