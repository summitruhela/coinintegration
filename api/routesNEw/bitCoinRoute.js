'use strict';

module.exports = function(app) {
  var bitcoin = require('../controllers/bitCoinController');

  app.route('/btc/address/:account')
    .get(bitcoin.generateAddress);

  app.route('/btc/balance/:account')
    .get(bitcoin.getBalance);

    app.route('/btc/addr_balance/:address')
    .get(bitcoin.getBalance_addr);

  app.route('/btc/deposits/:address')
    .get(bitcoin.getReceivedByAccount);

  app.route('/btc/transfer')
    .post(bitcoin.performTransfer);

  app.route('/btc/withdraw')
    .post(bitcoin.performWithdraw);

    app.route('/btc/newaddress/:account')
    .get(bitcoin.generateNewAddress);

    app.route('/btc/addresses/:account')
    .get(bitcoin.listAddresses);
};