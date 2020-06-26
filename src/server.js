'use strict';

const express = require('express');
const authRouter = require('../src/auth/router.js');
const testAuth = require('./auth/extra-routes.js');

const app = express();
app.use(express.json());

app.use('/', authRouter);
app.use('/', testAuth);



module.exports = {
  server: app, 
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Whee! We're up on ${PORT}`);
    },
    );
  },
};
  