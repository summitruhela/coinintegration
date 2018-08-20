'use strict';

module.exports = function(app) {
  var zcash = require('../controllers/zcashControllers');

  app.route('/zcash/address')
    .get(zcash.generateAddress);

   app.route('/zcash/Zaddress')
    .get(zcash.generateZAddress);

  app.route('/zcash/balance/:address')
    .get(zcash.getBalance);

  app.route('/zcash/deposits/:address')
    .get(zcash.getReceivedByAddress);

    //app.route('/zcash/Zdeposits/:address')
    //.get(zcash.getReceivedByAddress);

  app.route('/zcash/transfer')
    .post(zcash.performTransfer);

  app.route('/zcash/withdraw')
    .post(zcash.performWithdraw);
};