'use strict';

const express = require('express');
const auth = require('./middleware/basic.js');
const router = express.Router();
const UserModel = require('./models/user-models.js');
const User = new UserModel();

router.post('/signup', signUp);
router.post('/signin', auth, signIn);
router.get('users', getUsers);

async function signUp(req, res) {
  let userExists = await User.exists({ username: req.body.username });
  if (userExists) {
    res.send('User already exists');
    return;
  }

  let password = await UserModel.hashPassword(req.body.password);
  let newUser = await User.create({ username: req.body.username, password: password });
  if (newUser) {
    let token = UserModel.generateToken({ username: req.body.username });
    console.log(token);
    res.cookie('token', token);
    res.header('token', token);
    res.send('user was signed up');
  } else {
    res.status(403).send('user invalid');
  }
}

function signIn(req, res) {
  if (req.user) {
    let token = UserModel.generateToken({ username: req.user.username });
    console.log('user was signed in');

    res.cookie('token', token);
    res.header('token', token);
    res.send({ token, user: req.user });
  } else {
    res.status(403).send('invalid');
  }
}

async function getUsers(req, res) {
  let userQuery = await User.get();
  res.send(userQuery);
}

module.exports = router;
