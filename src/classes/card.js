class Card {
  static ranks = {
    1: 'Ace',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'Jack',
    12: 'Queen',
    13: 'King',
  };

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  isFaceCard() {
    return this.rank > 10;
  }

  toString() {
    const rankStr = Card.ranks[this.rank];
    const capitalizedSuit =
      this.suit.charAt(0).toUpperCase() + this.suit.slice(1);
    return `${rankStr} of ${capitalizedSuit}`;
  }
}

module.exports = Card;
