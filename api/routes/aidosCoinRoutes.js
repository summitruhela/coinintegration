'use strict';
module.exports = function (app) {
    var aidos = require('../controllers/aidosController');
    console.log("HERE");
    app.route('/adk/attachToMesh')
        .get(aidos.attachToMesh);

    app.route('/adk/getNodeInfo')
        .get(aidos.getNodeInfo);

    app.route('/adk/getBalances')
        .get(aidos.getBalances);

    app.route('/adk/broadcastTransaction')
        .get(aidos.broadcastTransactions);
    
    app.route('/adk/findTransaction')
        .get(aidos.findTransactions);


    app.route('/adk/getTips')
        .get(aidos.getTips)

    app.route('/adk/getTransactionApprove')
        .get(aidos.getTransactionApprove)

    app.route('/adk/getTrytes')
        .get(aidos.getTrytes)

    app.route('/adk/interruptAttachingToMesh')
        .get(aidos.interruptAttachingToMesh)

    app.route('/adk/storeTransactions')
        .get(aidos.storeTransactions)
     
}
