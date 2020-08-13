import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {bgColorService} from "../services/bgColor.service";
import {CardService} from "../services/card.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon = null;
  resultPage = 1;
  resultLimit = 12;

  constructor(
    private router: Router,
    private bgColorService: bgColorService,
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.resultPage = this.route.snapshot.params['page'];
    this.searchList();
  }

  searchList() {
    this.pokemon = this.cardService.searchListPokemon(this.resultLimit, this.resultPage);
    this.router.navigate(["/app-pokedex/" + this.resultPage]);
  }

  onNextPage(nbPage: number) {
    this.resultPage+=nbPage;
    this.searchList();
  }

  onPreviousPage(nbPage: number) {
    this.resultPage-=nbPage;
    this.searchList();
  }

  onSelectCard(id, page) {
    this.router.navigate(["/app-single-pokemon/" + page + "/" + id]);
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }
}
