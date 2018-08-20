'use strict';

module.exports = function(app) {
  var monero = require('../controllers/moneroController');

  app.route('/monero/account')
    .post(monero.createAccount);

  app.route('/monero/createAddress')
    .post(monero.createAddress);

  app.route('/monero/balance')
    .post(monero.getBalance);

  app.route('/monero/getIncomingTransfer')
    .post(monero.getIncomingTransfer);

  app.route('/monero/transfer')
    .post(monero.performTransfer);

    app.route('/monero/getRecieveByTxid')
    .post(monero.getReceivedByTxid);

    app.route('/monero/address')
    .post(monero.getAddress);

    app.route('/monero/integratedAddress')
    .post(monero.integratedAddress)
};