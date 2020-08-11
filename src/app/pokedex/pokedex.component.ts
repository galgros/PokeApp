import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from 'jquery';
import {bgColorService} from "../services/bgColor.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon = [];
  resultPage = 1;
  resultLimit = 12;
  response = [];
  description = [];
  pkmType = [];

  constructor(
    private appComponent: AppComponent,
    private router: Router,
    private bgColorService: bgColorService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const page = this.route.snapshot.params['page'];
    this.resultPage = +page;
    this.searchList();
  }

  searchList() {
    const param =
      "?offset=" +
      (this.resultLimit * this.resultPage - this.resultLimit ) +
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
          doc.pkmTypeRequest(data.types[0]?.type.url);
        },700)
        doc.pokemon.push({
          "name": pokemon.name,
          "abilities" : [
            doc.response
          ],
          "description": [doc.description],
          "type": [doc.pkmType],
          "info": data
        });
      });
    }
    console.log(this.pokemon);
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

  pkmTypeRequest(url){
    const doc = this;
    $.getJSON(url, function(data: object){
      doc.pkmType.push(data);
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

  onSelectCard(id, page) {
    this.router.navigate(["/app-single-pokemon/" + page + "/" + id]);
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }
}
