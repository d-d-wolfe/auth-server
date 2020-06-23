'use strict';

const base64 = require('base-64');

const UserModel = require('../models/user-models.js');

module.exports = async function authMiddleware(req, res, next) {
  let [authtype, authString] = req.headers.authorization.split(' ');
  let [username, password] = base64.decode(authString).split(':');

  let user = await UserModel.authenticateUser(username, password);

  if (user) {
    req.user = user;
    next();
  } else {
    next('Invalid login');
  }
  return 0;
};





