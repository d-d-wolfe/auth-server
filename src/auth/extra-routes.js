'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer-auth.js');
const UserModel = require('./models/user-models.js');
const User = new UserModel();
const authorize = require('./middleware/acl.js');

router.get('/secret', bearerMiddleware, (req, res) => {
  res.send(req.user);
});

router.get('/read', bearerMiddleware, authorize('read'), (req, res) => {
  res.send('Route /read worked');
});
router.post('/add', bearerMiddleware, authorize('create'), (req, res) => {
  res.send('Route /add worked');
});
router.put('/change', bearerMiddleware, authorize('update'), (req, res) => {
  res.send('Route /change worked');
});
router.delete('/remove', bearerMiddleware, authorize('delete'), (req, res) => {
  res.send('Route /remove worked');
});

module.exports = router;