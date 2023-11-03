const Card = require('./card');

class Deck {
  constructor() {
    this.cards = [];
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    for (const suit of suits) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  count() {
    return this.cards.length;
  }

  shuffle() {
    return this.cards.sort(() => Math.random() - 0.5);
  }

  draw(num) {
    const drawnCards = this.cards.splice(-num);
    return drawnCards;
  }
}

module.exports = Deck;
