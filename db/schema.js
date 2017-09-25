const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
  currentBet: String,
  stats: [{
    user: String, 
    losses: Number, 
    wins: Number,
    cheats: Number,
    cheatWins: Number
  }]
});

module.exports = mongoose.model('User', userSchema);
