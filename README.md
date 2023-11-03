
# Card Game API v2

This Node.js API provides functionality for managing card games. You can create card games, shuffle decks, draw cards, and compare cards. Below, you'll find information on installation, running the app, testing, and detailed instructions on how to use the API.

## Installation

To install the required dependencies, run the following command in your project's directory:

```bash
$ npm install
```

## Running the App

You can run the API in different modes:

- **Development Mode:**
  ```bash
  $ npm run start
  ```

- **Watch Mode:**
  ```bash
  $ npm run devserver
  ```

The API should be up and running at [http://localhost:3000](http://localhost:3000).

## Testing

To run unit tests, use the following command:

```bash
$ npm run test
```

## Usage

### Creating a Game

To create a new card game, make a POST request to the `/game` endpoint. In the request body, provide the names of the first and second players.

**Example Request:**

```http
POST /game
Content-Type: application/json

{
  "firstPlayer": "Player 1",
  "secondPlayer": "Player 2"
}
```

**Example Response:**

```json
{
  "id": "a-unique-game-id",
  "firstPlayer": "Player 1",
  "secondPlayer": "Player 2"
}
```

### Shuffling the Deck

You can shuffle the deck of a game by making a PATCH request to the `/game//shuffle?id={id}` endpoint, where `{id}` is the unique game ID.

**Example Request:**

```http
PATCH /game/shuffle?id=unique-id
```

This action returns a response with a 204 status code and shuffles the deck in the specified game.

### Drawing a Card

To draw a card from the deck of a game, make a PATCH request to the `/game/draw?id={id}` endpoint, where `{id}` is the unique game ID.

**Example Request:**

```http
PATCH /game/draw?id=unique-id
```

**Example Response:**

```json
{
  "suit": "hearts",
  "rank": 7
}
```

### Comparing Cards

You can compare two or more cards to find the winning card by making a POST request to the `/game/compare` endpoint. Provide an array of card names in the request body.

**Example Request:**

```http
POST /game/compare
Content-Type: application/json

{
    "cards": [
        "2 of Spades",
        "3 of Diamonds",
        "4 of Hearts",
        "Jack of Clubs"
    ]
}
```

**Example Response:**

```json
{
  "winningCard": "Jack of Clubs"
}
```

## API Endpoints

- `POST /game`: Create a new game.
- `PATCH /game/shuffle?id={id}`: Shuffle the deck in a game.
- `PATCH /game/draw?id={id}`: Draw a card from a game's deck.
- `POST /game/compare`: Compare multiple cards to find the winning card.

