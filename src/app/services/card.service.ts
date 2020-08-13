import * as $ from 'jquery';

export class CardService {

  pokemons;
  info;
  species;
  type;
  abilities;
  moves;
  index = 0;

  searchPokemon(value) {
    this.pokemons = [];
    const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + value.nameOrNumber;
    this.requestPokemon(pokeURL);
    return this.getPokemon();
  }

  searchMultiplePokemon(list) {
    for (let value of list) {
      this.pokemons = [];
      const pokeURL = "http://pokeapi.co/api/v2/pokemon/" + value.nameOrNumber;
      this.requestPokemon(pokeURL);
    }
    return this.getPokemon();
  }

  searchListPokemon(limit, page) {
    this.pokemons = [];
    this.index = 0;
    const param = "?offset=" + (limit * page - limit ) + "&limit=" + limit;
    const pokeURL = "http://pokeapi.co/api/v2/pokemon" + param;
    const doc = this;

    $.getJSON(pokeURL, function(data){
      for (let result of data.results) {
       doc.requestPokemon(result.url);
      }
    });
    return this.getPokemon();
  }

  requestPokemon(url) {
    const doc = this;

    this.abilities = [];
    this.species = [];
    this.type = [];
    this.moves = [];
    this.info = [];

    $.getJSON(url, function (data) {
      setTimeout(() => {
        doc.setSpecies(data.species.url);
        doc.setType(data.types[0]?.type.url, data.name);
        doc.setAbilities(data.abilities[0].ability.url);
        if (data.abilities.length > 1) {
          doc.setAbilities(data.abilities[1].ability.url);
        } else {
          doc.setAbilities(data.abilities[0].ability.url);
        }
      }, 500);
      doc.info.push({
          "base_experience": data.base_experience,
          "abilities": data.abilities,
          "height": data.height,
          "id": data.id,
          "name": data.name,
          "order": data.order,
          "weight": data.weight,
          "sprites": {"front_default": data.sprites.front_default, "back_default": data.sprites.back_default},
      });
      doc.setPokemon();
    });
  }

  setPokemon() {
      this.pokemons.push({
        "name": this.info[this.index].name,
        "info": this.info[this.index],
        "species": this.species,
        "type": this.type,
        "abilities": this.abilities,
        "moves": this.moves
      })
    this.index++;
  }

  setSpecies(url) {
    const doc = this;

    $.getJSON(url, function (data) {
      doc.species.push({
        "base_happiness": data.base_happiness,
        "capture_rate": data.capture_rate,
        "gender_rate": data.gender_rate,
        "habitat": data.habitat,
        "evolution_chain": data.evolution_chain,
        "flavor_text_entries": data.flavor_text_entries,
        "names": data.names
      });
    });
  }

  setType(url, pokemon) {
    const doc = this;
    $.getJSON(url, function (data) {
      doc.type.push({
        "damage_relations": data.damage_relations,
        "moves": data.moves,
        "name": data.name,
        "names": data.names,
      });
      // @ts-ignore
      for (let i = 0; i < 3; i++) {
        doc.setMoves(data.moves, pokemon, i);
      }
    });
  }

  setMoves(moves, pokemon, index) {
    const doc = this;
    const url = moves[Math.floor(Math.random() * moves.length)];
    $.getJSON(url, function (data) {
      if (data.damage_class.name === "physical" && data.power !== null && index < 2 ) {
        doc.moves.push({"data": data, "related_to": pokemon});
      } else if (data.damage_class.name === "special" && index === 2) {
        doc.moves.push({"data": data, "related_to": pokemon});
      } else {
        doc.setMoves(moves, pokemon, index);
      }
    });
  }

  setAbilities(url) {
    const doc = this;
    $.getJSON(url, function (data: object) {
      doc.abilities.push(data);
    });
  }

  getRandomNumber(maxValue: number) {
    return Math.floor(Math.random() * maxValue);
  }

  getPokemon() {
    this.index = 0;
    return this.pokemons;
  }
}
