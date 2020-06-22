'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());

server.start(PORT);