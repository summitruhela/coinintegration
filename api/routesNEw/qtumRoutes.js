'use strict';

module.exports = function(app) {
  var qtum = require('../controllers/qtumControllers');
  
  app.route('/qtum/address/:account')
  .get(qtum.generateAddress);

app.route('/qtum/balance/:account')
  .get(qtum.getBalance);

  app.route('/qtum/addr_balance/:address')
  .get(qtum.getBalance_addr);

app.route('/qtum/deposits/:address')
  .get(qtum.getReceivedByAccount);

app.route('/qtum/transfer')
  .post(qtum.performTransfer);

app.route('/qtum/withdraw')
  .post(qtum.performWithdraw);

  app.route('/qtum/newaddress/:account')
  .get(qtum.generateNewAddress);

  app.route('/qtum/addresses/:account')
  .get(qtum.listAddresses);
  
};


