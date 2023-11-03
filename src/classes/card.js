class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  isFaceCard() {
    return this.rank > 10;
  }

  toString() {
    const ranks = {
      1: 'Ace',
      11: 'Jack',
      12: 'Queen',
      13: 'King',
    };
    const rankStr = ranks[this.rank] || this.rank;
    const capitalizedSuit =
      this.suit.charAt(0).toUpperCase() + this.suit.slice(1);
    return `${rankStr} of ${capitalizedSuit}`;
  }
}

module.exports = Card;
