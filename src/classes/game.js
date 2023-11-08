const Deck = require('./deck');

class Game {
  static cardsPower = {
    ace: 14,
    king: 13,
    queen: 12,
    jack: 11,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };

  #games = [];

  constructor() {}

  createGame(firstPlayer, secondPlayer) {
    const newDeck = new Deck();
    newDeck.shuffle();
    const newGame = {
      id: Date.now().toString(),
      deck: newDeck,
      firstPlayer,
      secondPlayer,
    };
    this.#games.push(newGame);
    const { deck, ...result } = newGame;
    return result;
  }

  shuffleDeck(gameId) {
    const gameIndex = this.#games.findIndex((game) => game.id === gameId);

    // No game with such id
    if (gameIndex === -1) {
      return -1;
    }
    // The deck is empty
    if (this.#games[gameIndex].deck.count() === 0) {
      return 0;
    }

    this.#games[gameIndex].deck.shuffle();
    return 1;
  }

  drawCard(gameId) {
    const gameIndex = this.#games.findIndex((game) => game.id === gameId);

    // No game with such id
    if (gameIndex === -1) {
      return -1;
    }
    // The deck is empty
    if (this.#games[gameIndex].deck.count() === 0) {
      return 0;
    }

    return this.#games[gameIndex].deck.draw(1);
  }

  compareCards(cards) {
    const winningCard = cards.reduce((currentWinner, card) =>
      Game.cardsPower[card.split(' ')[0].toLowerCase()] >
      Game.cardsPower[currentWinner.split(' ')[0].toLowerCase()]
        ? card
        : currentWinner
    );

    return winningCard;
  }
}

module.exports = Game;
