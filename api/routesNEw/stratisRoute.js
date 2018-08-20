'use strict';

module.exports = function(app) {
  var stratis = require('../controllers/stratisControllers');

  app.route('/strat/wallet')
    .post(stratis.wallet);

    app.route('/strat/newaccount')
    .post(stratis.newAccount);

    app.route('/strat/address')
    .post(stratis.address);

  
};