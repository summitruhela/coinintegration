'use strict'


module.exports = (app) => {
    var eth = require('./../controllers/ethController');
    console.log('Eth_routes');
   

    app.route('/eth/getBalance')
    .get(eth.getBalance); // createAccount which have no parameter 

    app.route('/eth/getGasPrice')
    .get(eth.getGasPrice)
    
    app.route('/eth/estGas')
    .get(eth.estGas)
    
    app.route('/eth/getTxnCountForNonce')
    .get(eth.getTxnCountForNonce)

    app.route('/eth/signTxnFast')
    .get(eth.signTxnFast)
     
    app.route("/eth/createAccount")
    .get(eth.createAccount)



    // app.route('eth/getBalance')
    //     .get(eth.getBalance)

    // app.route('/eth/getAccounts')
    //     .get(eth.getAccounts)

    // app.route('/eth/getbalance')
    //     .get(eth.getBalance)

    // app.route('/eth/createAccount')
    //     .get(eth.createAccount)

    // app.route('/eth/signTransaction')
    //     .get(eth.signTransaction)

    // app.route('/eth/privateAccount')
    //     .get(eth.privateKeyToAccount)

    // app.route('/eth/walletInfo')
    //     .get(eth.walletInfo)

    // app.route('/eth/addWallet')
    //     .get(eth.addWallet)

    // app.route('/eth/createWallet')
    //     .get(eth.createWallet)

    // app.route('/eth/isSync')
    //     .get(eth.isSync)

    // app.route('/eth/defaultAccount')
    //     .get(eth.defaultAccount)

    // app.route('/eth/prepareTransfer')
    //     .get(eth.prepareTransfer)

    // app.route('/eth/version')
    //     .get(eth.version)

    // app.route('/eth/defaultAddress')
    //     .get(eth.default)

    // app.route('/eth/getGasPrice')
    //     .get(eth.getGasPrice)

    // app.route('/eth/getHashRate')
    //     .get(eth.getHashRate)

    // app.route('/eth/getBlock')
    //     .get(eth.getBlock)

    // app.route('/eth/sign')
    //     .get(eth.sign)

    // app.route('eth/createPersonalAccount')
    //     .get(eth.createPersonalAccount)

}