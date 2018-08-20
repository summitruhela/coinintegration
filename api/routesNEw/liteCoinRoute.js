'use strict';

module.exports = function(app) {
  var litecoin = require('../controllers/liteCoinController');
  
  app.route('/ltc/address/:account')
  .get(litecoin.generateAddress);

app.route('/ltc/balance/:account')
  .get(litecoin.getBalance);

  app.route('/ltc/addr_balance/:address')
  .get(litecoin.getBalance_addr);

app.route('/ltc/deposits/:address')
  .get(litecoin.getReceivedByAccount);

app.route('/ltc/transfer')
  .post(litecoin.performTransfer);

app.route('/ltc/withdraw')
  .post(litecoin.performWithdraw);

  app.route('/ltc/newaddress/:account')
  .get(litecoin.generateNewAddress);

  app.route('/ltc/addresses/:account')
  .get(litecoin.listAddresses);
  
};


