'use strict';

const UserModel = require('../models/user-models.js');
const usersSchema = require('../models/users-schema.js');

async function bearer(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('There are no auth headers');
  }

  let [authType, token] = req.headers.authorization.split(' ');
  let validUser = await usersSchema.validateToken(token);

  if  (validUser) {
    req.user = validUser;
    next();
  } else {
    next('Invalid Token');
  }
}

module.exports = {
  bearer,
};
