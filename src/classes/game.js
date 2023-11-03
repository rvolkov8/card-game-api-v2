const Deck = require('./deck');

class Game {
  #games = [];
  constructor() {}

  createGame(firstPlayer, secondPlayer) {
    const newDeck = new Deck();
    newDeck.shuffle();
    const newGame = {
      id: Date.now(),
      deck: newDeck,
      firstPlayer,
      secondPlayer,
    };
    this.#games.push(newGame);
    const { deck, ...result } = newGame;
    return result;
  }
}

module.exports = Game;
