const route = require('express').Router();
const signUpHandler = require('./controllers/signUpHandler.js');
const loginHandler = require('./controllers/loginHandler.js');
const playerStatsHandler = require('./controllers/playerStatsHandler.js');
const gameResultsHandler = require('./controllers/gameResultsHandler.js');
const betHandler = require('./controllers/betHandler.js');
const gameBoardHandler = require('./controllers/gameBoardHandler.js');

//Route to create a new account
route.post('/signup', signUpHandler);
//Route to login as existing user
route.get('/login', loginHandler);
// //route to retrieve player stats
// route.get('/stats', playerStatsHandler);
// //route to update user game stats
// route.post('/game', gameResultsHandler, () => {
  
// });
// //route to add bets/comments
// route.post('/bet', betHandler, () => {
  
// });
// //route to home page display game board
// route.get('/home', gameBoardHandler);

module.exports = route;
