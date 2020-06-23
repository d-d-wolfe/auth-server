'use strict';

const schema = require('./users-schema.js');
const Model = require('./mongo-interface.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET = 'secretvalidationstring';

class User extends Model {
  constructor() {
    super(schema);
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 5);
  }

  static async authenticateUser(username, password) {
    try {
      let users = await schema.find({ username });
      let authorized = await bcrypt.compare(password, users[0].password);
      if (authorized) {
        return users[0];
      } else {
        return false;
      }
    } catch (error) {
      console.error('ERROR :: ', error);
      return false;
    }
  }

  static generateToken(username) {
    let token = jwt.sign(username, SECRET);
    return token;
  }
}

module.exports = User;