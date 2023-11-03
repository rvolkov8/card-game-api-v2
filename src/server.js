const http = require('http');
const url = require('url');
const Game = require('./classes/game');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const game = new Game();
  const { pathname } = url.parse(req.url);
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
        const { firstPlayer, secondPlayer } = querystring.parse(body);
        if (!firstPlayer || !secondPlayer) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Two player names are required.' }));
        }
        const newGame = game.createGame(firstPlayer, secondPlayer);
        res.statusCode = 201;
        res.end(JSON.stringify(newGame));
      });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
