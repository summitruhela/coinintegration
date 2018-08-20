'use strict';
var steem = require('../controllers/steemCoinControllers');

module.exports = function(app) {
 
  app.route('/steem/get_account/:account')
    .get(steem.get_account);

    app.route('/steem/account_history/:account')
    .get(steem.account_history);

  
};


