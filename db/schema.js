const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  hash: String,
  currentBet: String,
  stats: [{
    user: String, 
    losses: Number, 
    wins: Number,
    cheats: Number,
    cheatWins: Number
  }]
});

User = mongoose.model('User', userSchema);

User.comparePassword = (plain, hash, callback) => {
  bcrypt.compare(plain, hash, (err, match) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, match);
    }
  })
}
module.exports = User;