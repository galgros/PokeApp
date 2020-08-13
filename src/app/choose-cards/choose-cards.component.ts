import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../services/player.service";
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from 'jquery';
import {bgColorService} from "../services/bgColor.service";
import {CardService} from "../services/card.service";

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
    private playerService: PlayerService,
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < this.resultLimit; i++) {
      this.selection.push({"id": i, "nameOrNumber":Math.floor(Math.random() * 800), "disabled": false})
    }
    this.pokemon = this.cardService.searchMultiplePokemon(this.selection)
  }

  onSelectCard(pkm, index) {
    if (this.selection[index].disabled === false && this.playerService.myCards.length < 3) {
      this.selection[index].disabled = true;
      this.playerService.setCards(pkm, index);
    } else {
      this.selection[index].disabled = false;
      this.playerService.removeCard(index);
    }
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }

  getName() {
    return this.playerService.name
  }

  getDisabled(index) {
    if (this.selection[index].disabled === true ) {
      return "disabled";
    }
    return "";
  }

  incrementTextIndex() {
    this.textIndex ++;
  }

  decrementTextIndex() {
    this.textIndex --;
  }
}
