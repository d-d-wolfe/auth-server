'use strict';

const UserModel = require('../models/user-models.js');


async function bearer(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('There are no auth headers');
  }

  let [authType, token] = req.headers.authorization.split(' ');
  console.log(token);
  let validUser = await UserModel.validateToken(token);
  console.log('valid user', validUser);
  if  (validUser) {
    req.user = validUser;
    next();
  } else {
    next('Invalid Token');
  }
}

module.exports = bearer;

