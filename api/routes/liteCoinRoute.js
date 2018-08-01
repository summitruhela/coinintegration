'use strict';
module.exports = function(app) {
  var litecoin = require('../controllers/liteCoinController');
 
  app.route('/ltc/address')
    .post(litecoin.generateAddress);
  app.route('/ltc/balance')
    .post(litecoin.getBalance);
  app.route('/ltc/deposits')
    .post(litecoin.getReceivedByAccount);
  app.route('/ltc/transfer')
    .post(litecoin.performTransfer);
  app.route('/ltc/withdraw')
    .post(litecoin.performWithdraw);
    app.route('/ltc/getRawTransaction')
    .post(litecoin.getRawTransaction);
    app.route('/ltc/newAddress')
    .post(litecoin.generateNewAddress);
    app.route('/ltc/Cointransfer')
    .post(litecoin.transfer);
    app.route('/ltc/listofAccounts')
    .post(litecoin.listofAccounts);
    app.route('/ltc/pool')
    .post(litecoin.pool);
    app.route('/ltc/valid')
    .post(litecoin.valid);
    app.route('/ltc/move')
    .post(litecoin.move);
    app.route('/ltc/amount')
    .post(litecoin.amount);
    app.route('/ltc/sendToAddress')
    .post(litecoin.sendToAddress);
    app.route('/ltc/addressByAccount')
    .post(litecoin.AddressByAccount)
    
    app.route('/ltc/blockcount')
    .post(litecoin.blockcount)
    app.route('/ltc/getinfo')
    .post(litecoin.getinfo)
};
////Account_2 ==== LaqSKa93MZZrfWkEirfKxYBYC1ZYkvU6bs
////Account_1 ==== Lf37bohTuvp9EXNZzCxm5pPV3Jj6q3wYDb