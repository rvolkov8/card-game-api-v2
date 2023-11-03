const Deck = require('../src/classes/deck');

describe('Deck', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test('it should have 52 cards by default', () => {
    expect(deck.count()).toBe(52);
  });

  test('it should shuffle the deck', () => {
    const originalOrder = [...deck.cards];
    deck.shuffle();
    const shuffledOrder = deck.cards;
    expect(originalOrder).not.toEqual(shuffledOrder);
  });

  test('it should draw a specific number of cards', () => {
    const numToDraw = 5;
    const drawnCards = deck.draw(numToDraw);

    expect(drawnCards).toHaveLength(numToDraw);
    expect(deck.count()).toBe(52 - numToDraw);
  });

  test('it should draw all cards and return an empty array', () => {
    const allCards = deck.draw(52);

    expect(allCards).toHaveLength(52);
    expect(deck.count()).toBe(0);
  });

  test('it should draw fewer cards than available and return the correct number', () => {
    const numToDraw = 10;
    const drawnCards = deck.draw(numToDraw);

    expect(drawnCards).toHaveLength(numToDraw);
    expect(deck.count()).toBe(52 - numToDraw);
  });
});
