'use strict';

module.exports = function(app) {
  var eth = require('../controllers/ethControllers');


  app.route('/eth/address')
    .get(eth.createAccount);

  app.route('/eth/balance')
    .post(eth.getBalance);

  app.route('/eth/getTransaction')
    .post(eth.getRawTransaction);

  app.route('/eth/transfer')
    .post(eth.performTransfer);

};

