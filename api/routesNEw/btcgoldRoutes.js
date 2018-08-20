'use strict';

module.exports = function(app) {
  var btcGold = require('../controllers/btcGoldControllers');
 
  app.route('/btg/address/:account')
    .get(btcGold.generateAddress);

  app.route('/btg/balance/:account')
    .get(btcGold.getBalance);

    app.route('/btg/addr_balance/:address')
    .get(btcGold.getBalance_addr);

  app.route('/btg/deposits/:address')
    .get(btcGold.getReceivedByAccount);

  app.route('/btg/transfer')
    .post(btcGold.performTransfer);

  app.route('/btg/withdraw')
    .post(btcGold.performWithdraw);

    app.route('/btg/newaddress/:account')
    .get(btcGold.generateNewAddress);

    app.route('/btg/addresses/:account')
    .get(btcGold.listAddresses);
};


