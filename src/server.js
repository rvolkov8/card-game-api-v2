const http = require('http');
const url = require('url');
const Game = require('./classes/game');
const querystring = require('querystring');

const game = new Game();

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const queryParams = querystring.parse(query);

  res.setHeader('Content-Type', 'application/json');

  // Post request to create a new game
  if (req.method === 'POST' && pathname === '/game') {
    let body = [];
    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const { firstPlayer, secondPlayer } = JSON.parse(body);
        if (!firstPlayer || !secondPlayer) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Two player names are required.' }));
        } else {
          const newGame = game.createGame(firstPlayer, secondPlayer);
          res.statusCode = 201;
          res.end(JSON.stringify(newGame));
        }
      });
  }

  // Patch request to shuffle a certain deck
  if (req.method === 'PATCH' && pathname === '/game/shuffle') {
    const { id } = queryParams;
    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Game ID is required.' }));
      return;
    }

    const shuffleResult = game.shuffleDeck(id);

    switch (shuffleResult) {
      case -1:
        res.statusCode = 404;
        res.end(
          JSON.stringify({ error: `Game with ID of ${id} does not exist.` })
        );
        break;
      case 0:
        res.statusCode = 422;
        res.end(
          JSON.stringify({ error: 'The deck is empty and cannot be shuffled.' })
        );
      case 1:
        res.statusCode = 204;
        res.end();
        break;
    }
  }

  // Patch request to draw a card from the deck
  if (req.method === 'PATCH' && pathname === '/game/draw') {
    const { id } = queryParams;
    if (!id) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Game ID is required.' }));
      return;
    }

    const drawResult = game.drawCard(id);

    switch (drawResult) {
      case -1:
        res.statusCode = 404;
        res.end(
          JSON.stringify({ error: `Game with ID of ${id} does not exist.` })
        );
        break;
      case 0:
        res.statusCode = 422;
        res.end(
          JSON.stringify({ error: 'The deck is empty and cannot be shuffled.' })
        );
        break;
      default:
        res.statusCode = 200;
        res.end(JSON.stringify(drawResult));
        break;
    }
  }

  if (req.method === 'POST' && pathname === '/game/compare') {
    let body = [];
    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const { cards } = JSON.parse(body);
        const winnerCard = game.compareCards(cards);
        res.statusCode = 200;
        res.end(JSON.stringify({ winnerCard }));
      });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
