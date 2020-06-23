'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('open', () => {
  console.log('Connected to Mongo');
});

server.start(PORT);