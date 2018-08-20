'use strict';

module.exports = function(app) {
  var monacoin = require('../controllers/monaCoinController');
  
  app.route('/mona/address/:account')
  .get(monacoin.generateAddress);

app.route('/mona/balance/:account')
  .get(monacoin.getBalance);

  app.route('/mona/addr_balance/:address')
  .get(monacoin.getBalance_addr);

app.route('/mona/deposits/:address')
  .get(monacoin.getReceivedByAccount);

app.route('/mona/transfer')
  .post(monacoin.performTransfer);

app.route('/mona/withdraw')
  .post(monacoin.performWithdraw);

  app.route('/mona/newaddress/:account')
  .get(monacoin.generateNewAddress);

  app.route('/mona/addresses/:account')
  .get(monacoin.listAddresses);
  
};


