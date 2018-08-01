'use strict';
module.exports = function(app) {
  var nano = require('../controllers/nanoController');
  
  app.route('/nano/address')
    .get(nano.createAddress);
  app.route('/nano/balance')
    .post(nano.getBalance);
  app.route('/nano/getAccountHistory')
    .post(nano.getAccountHistory);
  app.route('/nano/transfer')
    .post(nano.performTransfer);
  app.route('/nano/withdraw')
    .post(nano.performWithdraw);
    
    app.route('/nano/openAccount')
    .post(nano.openAccount);
    app.route('/nano/getNanoBalance')
    .post(nano.getNanoBalance);
    app.route('/nano/getRawBalance')
    .post(nano.getRawBalance);
   app.route('/nano/receiveBlock')
   .post(nano.receiveBlock);
};
