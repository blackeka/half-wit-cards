const express = require('express');
const User = require('../db/schema.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUpHandler = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.find({username}, (err, result) => {    
    if (err) {
      res.status(404).send(`We encountered an error while creating your account: ${err}`);
    } else if (result.data) {
      res.status(404).send("Username already exists.");
    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, null, (err, hash) => {
          User.create({username, hash}, (err, user) => {
            if (err) {
              res.status(400).send(`We encountered an error while creating your account: ${err}`);
            } else {
              res.status(201).send(`Success, welcome ${username}! Let's play!`);
            }
          })
        })
      })
    }
  })
}

module.exports = signUpHandler;
