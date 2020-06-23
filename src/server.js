'use strict';

const express = require('express');
const authRouter = require('../src/auth/router.js');

const app = express();
app.use(express.json());

app.use('/', authRouter);



module.exports = {
  server: app, 
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Whee! We're up on ${PORT}`);
    },
    );
  },
};
  