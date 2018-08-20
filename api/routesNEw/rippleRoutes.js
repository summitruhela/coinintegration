'use strict';

module.exports = function(app) {
  var ripple = require('../controllers/rippleController');

   app.route('/xrp/get_address')
    .get(ripple.get_address);

   app.route('/xrp/account_info/:account')
    .get(ripple.account_info);

  app.route('/xrp/server_info')
    .get(ripple.server_info);

  app.route('/xrp/get_deposits')
    .post(ripple.get_deposits);

app.route('/xrp/payment')
   .post(ripple.get_payment);

   
};