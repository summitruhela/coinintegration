'use strict';

module.exports = function(app) {
  var tron= require('../controllers/tronController');

  app.route('/bcd/demo')
    .get(tron.demo);
}