const Game = require('../src/classes/game');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test('it should create a new game', () => {
    const firstPlayer = 'Alice';
    const secondPlayer = 'Bob';
    const result = game.createGame(firstPlayer, secondPlayer);

    expect(result.firstPlayer).toBe(firstPlayer);
    expect(result.secondPlayer).toBe(secondPlayer);
  });

  test('it should shuffle the deck for a specific game', () => {
    const firstPlayer = 'Alice';
    const secondPlayer = 'Bob';
    const { id } = game.createGame(firstPlayer, secondPlayer);
    const shuffleResult = game.shuffleDeck(id);

    expect(shuffleResult).toBe(1); // Deck shuffled successfully
  });

  test('it should not shuffle an empty deck', () => {
    const firstPlayer = 'Alice';
    const secondPlayer = 'Bob';
    const { id } = game.createGame(firstPlayer, secondPlayer);
    const shuffleResult = game.shuffleDeck(id);

    expect(shuffleResult).toBe(1);
    for (let i = 0; i < 52; i++) {
      game.drawCard(id);
    }
    const shuffleResultAfterEmptying = game.shuffleDeck(id);

    expect(shuffleResultAfterEmptying).toBe(0); // Attempt to shuffle an empty deck
  });

  test('it should draw a card from a game deck', () => {
    const firstPlayer = 'Alice';
    const secondPlayer = 'Bob';
    const { id } = game.createGame(firstPlayer, secondPlayer);
    const drawnCard = game.drawCard(id);

    expect(drawnCard).toHaveLength(1);
  });

  test('it should compare cards and return the winning card', () => {
    const cards = ['King of Hearts', 'Queen of Diamonds', 'Jack of Spades'];
    const winningCard = game.compareCards(cards);

    expect(winningCard).toBe('King of Hearts');
  });
});
