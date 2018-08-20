//var moneroWallet = require('monero-nodejs');
const request = require('request');
//var wallet = new moneroWallet("127.0.0.1", 28080);

//const Wallet = require('monero-rpc').Wallet

//const wallets = new Wallet('http://127.0.0.1:28080');

module.exports = {

    /////////////////////////////////////////////Create an Account//////////////////////////////////////////////////
    createAccount: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "create_account",
            "params": {
                "label": req.body.label
            }
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(data));
                res.send(JSON.parse(data));
                
            }
        });

    },

    /////////////////////////////////////////////Create an Address//////////////////////////////////////////////////

    createAddress: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "create_address",
            "params": {
                "account_index": req.body.accountIndex,
                "label": req.body.label
            }
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(data);
                res.send(JSON.parse(data));
            }
        });

    },

    /////////////////////////////////////////////Get an Balance//////////////////////////////////////////////////

    getBalance: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "getbalance",
            "params": {
                "account_index": req.body.accountIndex,
            }
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(data);
                res.send(JSON.parse(data));
            }
        });

    },



    /////////////////////////////////////////////Get an Address//////////////////////////////////////////////////

    getAddress: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "getaddress",
            "params": {
                "account_index": req.body.accountIndex,
                "address_index": [  req.body.addressIndex ]
            }
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(data);
                res.send(JSON.parse(data));
            }
        });

    },

    /////////////////////////////////////////////Get recieve by Account//////////////////////////////////////////////////

    getReceivedByTxid: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "get_transfer_by_txid",
            "params": {
                "txid": req.body.txid
            }
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(data);
                res.send(JSON.parse(data));
            }
        });

    },


    /////////////////////////////////////////////Perform Transfer//////////////////////////////////////////////////

    performTransfer: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "transfer",
            "params": {
                "destinations": [{
                    "amount": req.body.amount,
                    "address": req.body.address
                }],
                "account_index": req.body.accountIndex,
                "payment_id":null,
                "subaddr_indices": req.body.addressIndex,
                "mixin":0,
                "get_tx_key": true,
                "get_tx_hex":true,
                //"get_tx_metadata":true,
                "unlock_time":0,
                "priority":req.body.priority
            },
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(data));
                res.send(JSON.parse(data));

            }
        });
    },

    /////////////////////////////////////////////Get incoming transfers//////////////////////////////////////////////////

    getIncomingTransfer: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "get_transfers",
            "params": {
               "in":false,
               "out":true,
               "pending":true,
                "account_index": req.body.accountIndex,

            }
        }

        var options = {
            url: 'http://127.0.0.1:28080/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(data);
                res.send(JSON.parse(data));
            }
        });

    },



/////////////////////////////Integrated Address///////////////////////////////////////////

integratedAddress: (req, res) => {
    console.log(req.body)
    var command = {
        "jsonrpc": "2.0",
        "id": "0",
        "method": "make_integrated_address",
        "params": {
            "payment_id": req.body.paymentId
        }
    }

    var options = {
        url: 'http://127.0.0.1:28080/json_rpc',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        form: JSON.stringify(command)
    };

    request(options, function (error, response, data) {
        console.log(error, data);
        if (!error && response.statusCode == 200) {
            console.log(data);
            res.send(JSON.parse(data));
        }
    });

}
}