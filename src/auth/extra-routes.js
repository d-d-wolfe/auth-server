'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer-auth.js');
const UserModel = require('./models/user-models.js');
const User = new UserModel();

router.get('/secret', bearerMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;