const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
  games: [{
    user: String, 
    losses: Number, 
    wins: Number,
    cheats: Number,
    cheatWins: Number
  }]
});

const User = mongoose.model('User', userSchema);
