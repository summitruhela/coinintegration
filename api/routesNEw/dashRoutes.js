'use strict';

module.exports = function(app) {
  var dash = require('../controllers/dashControllers');
 
  app.route('/dash/address/:account')
  .get(dash.generateAddress);

app.route('/dash/balance/:account')
  .get(dash.getBalance);

  app.route('/dash/addr_balance/:address')
  .get(dash.getBalance_addr);

app.route('/dash/deposits/:address')
  .get(dash.getReceivedByAccount);

app.route('/dash/transfer')
  .post(dash.performTransfer);

app.route('/dash/withdraw')
  .post(dash.performWithdraw);

  app.route('/dash/newaddress/:account')
  .get(dash.generateNewAddress);

  app.route('/dash/addresses/:account')
  .get(dash.listAddresses);
};


