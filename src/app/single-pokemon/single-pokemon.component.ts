import {Component, OnInit} from '@angular/core';
import {bgColorService} from "../services/bgColor.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-single-pokemon',
  templateUrl: './single-pokemon.component.html',
  styleUrls: ['./single-pokemon.component.scss']
})
export class SinglePokemonComponent implements OnInit {

  id;
  page;
  pkm = [];
  species = [];
  type = [];
  abilities = [];
  i;
  bgColorService = new bgColorService();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const page = this.route.snapshot.params['page'];
    const id = this.route.snapshot.params['id'];
    this.id = +id;
    this.page = +page;
    this.type = [];
    this.searchPokemon(+id);
  }

  searchPokemon(id) {
    const doc = this
    const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + id;

    $.getJSON(pokeURL, function (data) {
      setTimeout(() => {
        doc.getSpecies(data.species.url);
        doc.getAbilities(data.abilities[0].ability.url)
        doc.getAbilities(data.abilities[1].ability.url)
        doc.getType(data.types[0]?.type.url);
      }, 1000)
      doc.pkm.push({"info": data, "type": doc.type, "species": doc.species, 'abilities': doc.abilities});
      doc.router.navigate(["/app-single-pokemon/" + doc.page + "/" + id])
    });
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
    console.log(this.pkm)
    this.router.navigate(["/app-single-pokemon/" + this.page + "/" + this.id])
  }

  getBgColor(type) {
    return this.bgColorService.getBgColor(type);
  }
}
