'use strict';

module.exports = function(app) {
  var vergeCurrency = require('../controllers/vergeCurrencyController');

  app.route('/xvg/address/:account')
    .get(vergeCurrency.generateAddress);

  app.route('/xvg/balance/:account')
    .get(vergeCurrency.getBalance);

  app.route('/xvg/deposits/:address')
    .get(vergeCurrency.getReceivedByAccount);

  app.route('/xvg/transfer')
    .post(vergeCurrency.performTransfer);

  app.route('/xvg/withdraw')
    .post(vergeCurrency.performWithdraw);
};