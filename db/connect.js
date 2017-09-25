const mongoose = require('mongoose');

mongoose.connect('mongodb://Tester:Test@ds149874.mlab.com:49874/half-wit-cards');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('-----Mlab, mongoose connection made!-----');
});

module.exports = db;
