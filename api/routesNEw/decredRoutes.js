'use strict';

module.exports = function(app) {
  var decred = require('../controllers/decredControllers');
 

  app.route('/decred/demo')
     .post(decred.demo);

     app.route('/decred/wallet')
     .post(decred.wallet);

//Done
     app.route('/decred/newaccount/:account')
     .get(decred.newAccount);

//Done
      app.route('/decred/address/:account')
    .get(decred.generateAddress);

//Done
    app.route('/decred/balance/:account')
    .get(decred.balance);

//Done    
    app.route('/decred/addresses/:account')
    .get(decred.AddressByAccount) 
 
 //Done
 app.route('/decred/newaddress/:account')
     .get(decred.generateNewAddress);
     
//Done
   app.route('/decred/deposits/:account')
     .get(decred.getReceivedByAccount);
//Done
  app.route('/decred/addr_balance/:address')
    .get(decred.getBalance_addr);


   app.route('/decred/transfer')
     .post(decred.performTransfer);

   app.route('/decred/withdraw')
     .post(decred.performWithdraw);

    

     app.route('/decred/Cointransfer')
     .post(decred.transfer);
    

     app.route('/decred/sendToAddress')
     .post(decred.sendToAddress);

     
    

};


