export class PlayerService {
  name;
  myCards = [];
  xp;

  setCards(pkm) {
    if (this.myCards.length < 3) {
      this.myCards.push(pkm);
      console.log(this.myCards)
    }
  }

  getCards() {
    return this.myCards;
  }
}
