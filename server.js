/* eslint-disable prefer-arrow-callback */

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const db = require('./queries');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('client/build'));
// server.use(express.static('public'));

server.get('/api/recipes', db.getRecipes);
server.get('/api/recipes/:id', db.getRecipe);

const runServer = function (callback) {
  server.listen(config.PORT, function () {
    console.log(`Listening on localhost: ${config.PORT}`);
    if (callback) {
      callback();
    }
  });
};

if (require.main === module) {
  runServer(function (err) {
    if (err) {
      console.error(err, 'Server not started');
    }
  });
}
