'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());



module.exports = {
  server: app, 
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Whee! We're up on ${PORT}`);
    },
    );
  },
};
  