const Card = require('./card');

class Deck {
  static suits = ['hearts', 'diamonds', 'spades', 'clubs'];

  constructor() {
    this.cards = [];
    for (const suit of Deck.suits) {
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
    if (num <= 0) {
      throw new Error('Number of cards to draw should greater than 0.');
    }

    if (this.cards.length < num) {
      throw new Error('Not enough cards in the deck to draw.');
    }

    const drawnCards = this.cards.splice(-num);
    return drawnCards;
  }
}

module.exports = Deck;
