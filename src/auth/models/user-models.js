'use strict';

const schema = require('./users-schema.js');
const Model = require('./mongo-interface.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('./roles.js');

let SECRET = process.env.SECRET;
//let EXPIRES = process.env.TOKEN_EXPIRATION;

class User extends Model {
  constructor() {
    super(schema);
    this.role = roles.user;
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

  static async validateToken(token) {
    try {
      let user = await jwt.verify(token, SECRET);
      return user;
    } catch (error) {
      return false;
    }
  }
  // this function validates the permissions by checking the permission provided against the permissions assigned to the user via their role. The user is fetched using their auth token.
  static async validatePermission(token, perm) {
    let user = this.validateToken(token);
    let hasPermission = false;
    user.role.forEach(rolePerm => {
      hasPermission |= rolePerm === perm;
    });
    return hasPermission;
  }
}

module.exports = User;