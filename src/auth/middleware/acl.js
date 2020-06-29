'use strict';

module.exports = (capability) => (req, res, next) => {
  if (req.user.capabilities.includes(capability)) {
    next();
  } else {
    next('Permission Denied');
  }
};
