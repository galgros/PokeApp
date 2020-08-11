import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../services/player.service";
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from 'jquery';
import {bgColorService} from "../services/bgColor.service";

@Component({
  selector: 'app-choose-cards',
  templateUrl: './choose-cards.component.html',
  styleUrls: ['./choose-cards.component.scss']
})
export class ChooseCardsComponent implements OnInit {

  textIndex = 0
  pokemon = [];
  resultLimit = 5;
  selection = [];
  response = [];
  description = [];
  pkmType = [];

  constructor(
    private appComponent: AppComponent,
    private router: Router,
    private bgColorService: bgColorService,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < this.resultLimit; i++) {
      this.selection.push({"id": i, "pokeId":Math.floor(Math.random() * 800), "disabled": false})
    }
    this.searchList();
  }

  searchList() {
    const param = this.selection

    for (let pkm of param) {
      const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + pkm.pokeId;
      const doc = this;

      $.getJSON(pokeURL, function(data){
        setTimeout(() => {
          doc.pkmInfoRequest(data.abilities[0]?.ability.url);
          doc.pkmInfoRequest(data.abilities[1]?.ability.url);
          doc.pkmDescriptionRequest(data.species.url);
          doc.pkmTypeRequest(data.types[0]?.type.url);
        }, 700)
        doc.pokemon.push({
          "name": doc.pokemon,
          "abilities": [
            doc.response
          ],
          "description": [doc.description],
          "type": [doc.pkmType],
          "info": data
        });
      });
    }
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

  onSelectCard(pkm, index) {
    this.selection[index].disabled = true;
    this.playerService.setCards(pkm);
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }

  getName() {
    return this.playerService.name
  }

  incrementTextIndex() {
    this.textIndex ++;
  }

  decrementTextIndex() {
    this.textIndex --;
  }

}
