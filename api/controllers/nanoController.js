const request = require('request');
const axios = require('axios');
const config = require('../../config/default')
const {
    Nano
} = require('nanode')
const nano = new Nano({
 url: 'http://172.16.21.5:7076/'
})
const getAddress = async () => {
    try {
        const {
            privateKey,
            publicKey,
            address
        } = await nano.key.create();
        var obj = {
            privateKey: privateKey,
            publicKey: publicKey,
            address: address
        }
        return obj;
    } catch (err) {
        //Failed to fetch unspent transactions.
        console.log(err);
        return err;
    }
}
const nanoBalance = async (privateKey) => {
    const account = nano.account(privateKey)
    try {
        return await account.nanoBalance()
    } catch (err) {
        console.log(err);
        return err;
    }
}
const nanoReceiveBlock = async (privateKey, hash) => {
    const account = nano.account(privateKey)
    try {
        // var receiveBlock = await nano.account(privateKey).receive();

        var receiveBlock = await account.receive(hash);
        console.log("@###################", receiveBlock)
        return receiveBlock;
    } catch (err) {
        console.log(err);
        return err;
    }
}
const nanoRawBalance = async (privateKey) => {
    const account = nano.account(privateKey)
    try {
        return await account.rawBalance()
    } catch (err) {
        console.log(err);
        return err;
    }
}
const open = async (privateKey) => {
    try {
        var openData = await nano.account(privateKey).open();
        return openData;
    } catch (err) {
        return err;
    }
}
// const balance = async(privateKey)=>{
//     try{
//        return await privateKey.nanoBalance();
//     }
//     catch (err) {
//         console.log(err);
//     }
// }
const sendTransaction = async (privateKey, amount, destination) => {
    const account = nano.account(privateKey);
    try {
        return await account.send(amount, destination)
    } catch (err) {
        console.log(err);
        return err;
    }
}
module.exports = {
    /////////////////////////////////////////////Create an Address//////////////////////////////////////////////////
    // createAddress: (req, res) => {
    //     var command = {
    //         "action": "account_create",
    //         "wallet": config.walletAddress
    //     }
    //     var options = {
    //         url: 'http://127.0.0.1:7076/',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         form: JSON.stringify(command)
    //     };
    //     request(options, function (error, response, data) {
    //         console.log(error, data);
    //         if (!error && response.statusCode == 200) {
    //             console.log("RESPONSE IS HERE=========>", data);
    //             res.send({
    //                 responseCode: 200,
    //                 address: JSON.parse(data)
    //             });
    //         } else {
    //             res.send({
    //                 responseCode: 500,
    //                 data: JSON.parse(error)
    //             });
    //         }
    //     });
    // },
    createAddress: (req, res) => {
        getAddress().then(addressData => {
            console.log("@@@@@@@@@@@@@@@@@@", addressData);
            res.send({
                responseCode: 200,
                address: addressData
            })
        }).catch(error => {
            res.send({
                responseCode: 500,
                data: error
            });
        })
    },
    openAccount: (req, res) => {
        var privateKey = req.body.privateKey;
        console.log("!!!!!!!!!!!!!!!!!!!", privateKey);
        open(privateKey).then(data => {
            res.send({
                responseCode: 200,
                openAccount: data
            })
        }).catch(error => {
            res.send({
                responseCode: 500,
                data: error
            });
        })
    },
    /////////////////////////////////////////////Get an Balance//////////////////////////////////////////////////
    getBalance: (req, res) => {
        var command = {
            "action": "account_balance",
            "account": req.body.address
        }
        var options = {
            url: 'http://127.0.0.1:7076/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };
        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log("RESPONSE IS HERE========>", data);
                res.send({
                    responseCode: 200,
                    balance: JSON.parse(data)
                });
            } else {
                res.send({
                    responseCode: 500,
                    data: JSON.parse(error)
                });
            }
        });
    },
    getNanoBalance: (req, res) => {
        nanoBalance(req.body.privateKey).then(nanoAmount => {
            console.log("@@@@@@@@@@@@@@@@@@", nanoAmount);
            res.send({
                responseCode: 200,
                nanoBalance: nanoAmount
            })
        }).catch(error => {
            res.send({
                responseCode: 500,
                data: error
            });
        })
    },
    getRawBalance: (req, res) => {
        nanoRawBalance(req.body.privateKey).then(nanoAmount => {
            console.log("@@@@@@@@@@@@@@@@@@", nanoAmount);
            res.send({
                responseCode: 200,
                nanoRawBalance: nanoAmount
            })
        }).catch(error => {
            res.send({
                responseCode: 500,
                data: error
            });
        })
    },
    receiveBlock: (req, res) => {
        nanoReceiveBlock(req.body.privateKey, req.body.hash).then(receiveBlock => {
            console.log("@@@@@@@@@@@@@@@@@@", receiveBlock);
            res.send({
                responseCode: 200,
                receiveBlock: receiveBlock
            })
        }).catch(error => {
            res.send({
                responseCode: 500,
                data: error
            });
        })
    },
    // getBalance1: (req, res) => {
    //     var account = nano.account(req.body.privateKey);
    //     balance(account).then(data => {
    //         res.send({
    //             responseCode: 200,
    //             openAccount: JSON.parse(data)
    //         })
    //     }).catch(error => {
    //         res.send({
    //             responseCode: 500,
    //             data: JSON.parse(error)
    //         });
    //     })
    // },
    /////////////////////////////////////////////Get history of Account//////////////////////////////////////////////////
    getAccountHistory: (req, res) => {
        var command = {
            "action": "account_history",
            "account": req.body.address,
            "count": -1
        }
        var options = {
            url: 'http://127.0.0.1:7076/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };
        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log("RESPONSE IS HERE========>", data);
                res.send({
                    responseCode: 200,
                    history: JSON.parse(data)
                });
            } else {
                res.send({
                    responseCode: 500,
                    data: JSON.parse(error)
                });
            }
        });
    },
    performTransfer: (req, res) => {
        var privateKey = req.body.privateKey;
        var amount = req.body.amount;
        var destination = req.body.destination;
        sendTransaction(privateKey, amount, destination).then(data => {
            res.send({
                responseCode: 200,
                hash: data
            })
        }).catch(error => {
            res.send({
                responseCode: 500,
                data: error
            });
        })
    },
    /////////////////////////////////////////////Get incoming transfers//////////////////////////////////////////////////
    performWithdraw: (req, res) => {
        var command = {
            "action": "send",
            "wallet": config.walletAddress,
            "source": req.body.source,
            "destination": req.body.destination,
            "amount": req.body.amount
        }
        var options = {
            url: 'http://127.0.0.1:7076/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };
        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log("RESPONSE IS HERE========>", data);
                res.send({
                    responseCode: 200,
                    withdraw: JSON.parse(data)
                });
            } else {
                res.send({
                    responseCode: 500,
                    data: JSON.parse(error)
                });
            }
        });
    },
}