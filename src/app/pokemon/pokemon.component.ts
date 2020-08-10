import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {FormBuilder} from "@angular/forms";
import {CardService} from "../services/card.service";
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  title = this.appComponent.title;
  form;
  pokemon = null;

  constructor(
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      nameOrNumber: ""
    })
  }

  ngOnInit(): void {
  }

  pokeSubmit(value) {
    this.cardService.findByNameOrId(value);
    const param = value.nameOrNumber;
    const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;
    const doc = this;

    $.getJSON(pokeURL, function(data){
      doc.pokemon = data;
    });
  }
}
