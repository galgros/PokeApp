import * as $ from 'jquery';

export class PlayerService {
  name;
  myCards = [];
  cardIndex = [];
  xp;

  setCards(pkm, index) {
    if (this.myCards.length < 3) {
      this.myCards.push(pkm);
      this.cardIndex.push(index);
    }
  }

  removeCard(index) {
    for (let i = 0; i < this.cardIndex.length; i++) {
      if (this.cardIndex[i] === index) {
        this.myCards.splice(i, 1);
        this.cardIndex.splice(i, 1);
      }
    }
  }

  getCards() {
    return this.myCards;
  }
}
