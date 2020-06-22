'use strict';

require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

