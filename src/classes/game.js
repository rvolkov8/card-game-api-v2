const Deck = require('./deck');

class Game {
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
}

module.exports = Game;
