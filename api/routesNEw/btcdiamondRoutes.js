'use strict';

module.exports = function(app) {
  var btcDiamond = require('../controllers/btcDiamondController');

  app.route('/bcd/address/:account')
    .get(btcDiamond.generateAddress);

  app.route('/bcd/balance/:account')
    .get(btcDiamond.getBalance);

    app.route('/bcd/addr_balance/:address')
    .get(btcDiamond.getBalance_addr);

  app.route('/bcd/deposits/:address')
    .get(btcDiamond.getReceivedByAccount);

  app.route('/bcd/transfer')
    .post(btcDiamond.performTransfer);

  app.route('/bcd/withdraw')
    .post(btcDiamond.performWithdraw);

    app.route('/bcd/newaddress/:account')
    .get(btcDiamond.generateNewAddress);

    app.route('/bcd/addresses/:account')
    .get(btcDiamond.listAddresses);
};