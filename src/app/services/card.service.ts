import * as $ from 'jquery';

export class CardService {
  pokemon;
  abilities;
  moves;

  findByNameOrId(value) {
    const param = value.nameOrNumber;
    const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;
    const doc = this;

    $.getJSON(pokeURL, function(data){
      doc.saveData(data)
      console.log(data);
    });

    return this.getPokemon();
  }

  saveData(data) {
    this.pokemon = data;
    this.abilities = data.abilities;
    this.moves = data.moves;
  }

  getPokemon() {
    return this.pokemon;
  }
}
