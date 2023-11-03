const Card = require('../src/classes/card');

describe('Card', () => {
  test('isFaceCard() should return true for King', () => {
    const kingCard = new Card('hearts', 13);
    expect(kingCard.isFaceCard()).toBe(true);
  });

  test('toString() should return correct string representation', () => {
    const aceCard = new Card('spades', 1);
    expect(aceCard.toString()).toBe('Ace of Spades');
  });
});
