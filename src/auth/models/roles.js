'use strict';

module.exports = {
  user: ['read'],
  writer: ['read', 'create'],
  editor: ['read', 'update', 'delete'],
  admin: ['read', 'create', 'update', 'delete'],
};