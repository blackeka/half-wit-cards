const express = require('express');
const User = require('../db/schema.js');
const bcrypt = require('bcrypt');

const loginHandler = (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  console.log('in backend', username, password)
  User.findOne({username})
    .exec((err, result) => {
    if (err) {
      res.status(404).send(`We encountered an error looking for your account: ${err}`);
    } else if (result) {
      console.log('here is result.data', result)
      res.status(200).send('No hacking, play nice.')
      // User.comparePassword(password, result.hash, (err, match) => {
      //   if (match) {
      //     console.log(res, 'what the')
      //     res.status(200).send('Get ready to play');
      //   } else {
      //     res.status(500).send(`Hmm something doesn\'t look right ${err}`);
      //   }
      // })
    }
  });
}

module.exports = loginHandler;
