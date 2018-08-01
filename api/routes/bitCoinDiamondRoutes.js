'use strict';
module.exports = function(app) {
  var bitcoin = require('../controllers/bitCoinDiamondController');

  app.route('/address/:account')
    .get(bitcoin.generateAddress);

  app.route('/balance/:address')
    .get(bitcoin.getBalance);

  app.route('/deposits/:address')
    .get(bitcoin.getReceivedByAccount);

  app.route('/transfer')
    .post(bitcoin.performTransfer);

  app.route('/withdraw')
    .post(bitcoin.performWithdraw);
};
console.log("diamond_______________")