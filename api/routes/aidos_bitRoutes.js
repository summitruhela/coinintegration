module.exports = (app) => {
    var aidos_bit = require('./../controllers/aidos_bitController')
    console.log("aidos_bit")
    app.route('/aidos/getNewAddress/:account')
        .get(aidos_bit.getNewAddress)

    app.route('/aidos/validate/:address')
        .get(aidos_bit.validateAddress)

    app.route('/aidos/getReceivedByAccount/:address')
        .get(aidos_bit.getReceivedByAccount);

    app.route('/aidos/getBalance/:account')
        .get(aidos_bit.getBalance);

    app.route('/aidos/listTx/:account')
        .get(aidos_bit.listTx);

    app.route('/aidos/listaccounts')
        .get(aidos_bit.listAccounts);

    app.route('/aidos/listAddressGroupings/:address')
        .get(aidos_bit.listAddressGroupings);

    app.route('/aidos/sendToAddress')
        .post(aidos_bit.sendToAddress);

    app.route('/aidos/setTxFee/:amount')
        .get(aidos_bit.setTxFee)
}