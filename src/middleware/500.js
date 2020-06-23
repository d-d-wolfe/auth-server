'use strict';

module.exports = (req, res) => {
  console.log('__ERROR!__: 500');
  res.status(500).send('Internal Server Error');
};
