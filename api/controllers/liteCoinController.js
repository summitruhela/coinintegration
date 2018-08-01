'use strict';
const Client = require('bitcoin-core');
const Utils = require('../../lib/utils');
const Config = require('config');
//const client = new Client(Config.get('Litecoin.testnet'));
let client = new Client({
    "username": "imran",
    "password": "whoami",
    "port"    : 19332,
    "host"    : "http://182.76.185.45",
    "network" : "testnet"
})
/**
 * Returns array of unspent transaction inputs in the wallet
 *
 * @return {Array} unspent transactions
 */
const listUnspent = async () => {
    try {
        let unspent = await client.listUnspent();
        return unspent;
    } catch (err) {
        //Failed to fetch unspent transactions.
        console.log(err);
    }
}
/**
 * Calculate transaction fees for Regular pay-to addresses
 * (Legacy Non-segwit - P2PKH/P2SH)
 *
 * @param  {Integer} Total inputs of unspent transactions
 * @param  {Integer} Total outputs
 * @param  {Integer} # of confirmations for the transaction to calculate the transaction fees
 * @return {Double}  Transaction Fee
 */
const calculateTxFee = async (input, output, confirmations) => {
    try {
        const fee = await client.estimateSmartFee(6);
        if (fee['errors'])
            fee['feerate'] = 0.00010024;
        var txFee = (((input * 148 + output * 34 + 10) + 40) / 1024) * fee['feerate'];
        return txFee;
    } catch (err) {
        console.log(err);
    }
}
/**
 * Create a transaction spending given inputs, send to given address(es)
 *
 * @param  {Array} Transaction Object
 * @param  {String} Sending Address
 * @param  {Float} Spendable Amount
 * @return {String} Returns the hex-encoded transaction in a string
 */
const createRawTransaction = async (transactions, sendTo, amount, fee) => {
    if (fee) {
        var txFee = Utils.round(fee, '8');
        amount = amount - txFee;
        amount = Utils.round(amount, '8');
    }
    try {
        if (txFee) {
            let transactionFee = await client.setTxFee(txFee);
        }
        let rawtxid = await client.createRawTransaction(transactions, {
            [sendTo]: amount
        });
        return rawtxid;
    } catch (err) {
        console.log(err);
    }
}
/**
 * @param  {[type]}
 * @return {[type]}
 */
const fundRawTransaction = async (rawTransaction, changeAddress) => {
    try {
        if (changeAddress) {
            let frt = await client.fundRawTransaction(rawTransaction, {
                "changeAddress": changeAddress
            });
            return frt;
        } else {
            let frt = await client.fundRawTransaction(rawTransaction);
            return frt;
        }
    } catch (err) {
        console.log(err);
    }
}
/**
 * Adds signatures to a raw transaction and returns the resulting
 * raw transaction.
 *
 * @param  {String} Hex encoded transaction
 * @return {String} Signed raw transaction
 */
const signRawTransaction = async (rawTransaction) => {
    try {
        let signedTransaction = await client.signRawTransaction(rawTransaction);
        return signedTransaction;
    } catch (err) {
        console.log(err);
    }
}
/**
 * Submits raw transaction (serialized, hex-encoded) to local node and network.
 *
 * @param  {String} Signed transaction
 * @return {String} Transaction Id
 */
const sendRawTransaction = async (signedTransaction) => {
    try {
        let sendTransactions = await client.sendRawTransaction(signedTransaction);
        return sendTransactions;
    } catch (err) {
        console.log(err);
    }
}
/**
 * Returns the current bitcoin address for receiving payments to this account.
 * If <account> does not exist, it will be created along with an associated
 * new address that will be returned.
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.generateAddress = function (req, res) {
    var account = req.body.account;
    client.getAccountAddress(account, function (err, address) {
        if (err) {
            return console.error(err);
        }
        console.log("Your address of account : " + account + " is", address);
        res.json({
            'code': 200,
            "address": address
        })
    });
};

///Get a new address accourding to an given Account///
exports.generateNewAddress = function (req, res) {
    var account = req.body.account;
    client.getNewAddress(account, function (err, address) {
        if (err) {
            return console.error(err);
        }
        console.log("Your new  address of account : " + account + " is", address);
        res.json({
            'code': 200,
            "address": address
        })
    });
};
/**
 * If [account] is not specified, returns the server's total available
 * balance. If [account] is specified, returns the balance in
 * the account.
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.getBalance = function (req, res) {
    var address = req.body.address;
    listUnspent().then(unspent => {
        var unspentBalance = unspent.filter((unspent) => unspent.account == address);
        var balance = 0;
        if (unspentBalance.length) {
            for (var transactions in unspentBalance) {
                balance += unspentBalance[transactions].amount;
            }
        }
        balance = Utils.round(balance, '8');
        console.log("Your balance of address : " + address + " is", balance);
        res.json({
            responseCode: 200,
            responseMessage: "Success",
            "balance": balance
        });
    });
};
/**
 * Returns up to [count] most recent transactions skipping the
 * first [from] transactions for account [account].
 * If [account] not provided it'll return recent transactions
 * from all accounts.
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.getReceivedByAccount = function (req, res) {
    var address = req.body.address;
    client.listTransactions(address, function (err, deposits) {
        // console.log(deposits)
        if (err) {
            return res.json(err)
        }
        if (deposits.length) {
            var depositSubet = [];
            for (var deposit in deposits) {
                var subset = (({
                    txid,
                    amount,
                    confirmations
                }) => ({
                    txid,
                    amount,
                    confirmations
                }))(deposits[deposit]);
                depositSubet.push(subset);
            }
            res.json({
                responseMessage: "Deposits",
                depositSubet
            });
        } else {

            res.json({
                code: "Sorry !!!!!! No deposits yet"
            })
        }
        // else {
        //     res.json({responseMessage:"Internal server Error","code": "500"})
        // }
    });
};
/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.performTransfer = function (req, res) {
    // Get all unspent transactions
    listUnspent().then(unspent => {
        var sendTransactions = unspent.filter((unspent) => unspent.address == req.body.SendFrom);
        var listTransactions = [];
        var transactionAmount = 0;
        if (sendTransactions.length) {
            for (var transactions in sendTransactions) {
                listTransactions.push({
                    'txid': sendTransactions[transactions].txid,
                    'vout': sendTransactions[transactions].vout
                });
                transactionAmount += sendTransactions[transactions].amount;
            }
            calculateTxFee(listTransactions.length, 1, 6).then(fee => {
                createRawTransaction(listTransactions, req.body.SendTo, transactionAmount, fee).then(rawtxid => {
                    signRawTransaction(rawtxid).then(signedTransaction => {
                        sendRawTransaction(signedTransaction['hex']).then(sendTransactions => {
                            res.json({
                                'code': 200,
                                'tx-hash': sendTransactions,
                                'fee': Utils.round(fee, '8'),
                                'sent-amount': transactionAmount
                            });
                        });
                    });
                });
            });
        } else {
            res.json({
                'code': 500,
                "message": "No unspent transaction found for given address."
            });
        }
    });
};
/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.performWithdraw = function (req, res) {
    //SendTo
    //AmountToTransfer
    //ChangeAddress
    var changeaddress = req.body.ChangeAddress ? req.body.ChangeAddress : null;
    // Get all unspent transactions
    listUnspent().then(unspent => {
        var sendTransactions = unspent.filter((unspent) => unspent.address == req.body.SendFrom);
        var listTransactions = [];
        var transactionAmount = 0;
        if (sendTransactions.length) {
            for (var transactions in sendTransactions) {
                listTransactions.push({
                    'txid': sendTransactions[transactions].txid,
                    'vout': sendTransactions[transactions].vout
                });
                transactionAmount += sendTransactions[transactions].amount;
            }
            // Check if sufficient funds available...
            if (req.body.AmountToTransfer < transactionAmount) {
                //Updated to use the fundRawTransaction method
                createRawTransaction(listTransactions, req.body.SendTo, req.body.AmountToTransfer, null).then(rawtxid => {
                    fundRawTransaction(rawtxid, changeaddress).then(frt => {
                        signRawTransaction(frt['hex']).then(signedTransaction => {
                            sendRawTransaction(signedTransaction['hex']).then(sendTransactions => {
                                res.json({
                                    'code': 200,
                                    'tx-hash': sendTransactions,
                                    'fee': frt['fee']
                                });
                            });
                        });
                    });
                });
            } else {
                res.json({
                    'code': 500,
                    "message": "Insufficient Funds!"
                });
            }
        } else {
            res.json({
                'code': 500,
                "message": "No unspent transaction found for given address."
            });
        }
    });
};
//////api
exports.getRawTransaction = function (req, res) {
    var txid = req.body.txid;
    var hash = req.body.hash;
    client.getRawTransaction(txid, function (err, address) {
        if (err) {
            return res.json(err);
        }
        console.log(address);
        res.json({
            'code': 200,
            "Results": address
        })
    });

};
exports.transfer = function (req, res) {
    var account = req.body.fromaccount;
    var address = req.body.tolitecoinaddress;
    var amount = req.body.amount;

    client.sendFrom(account, address, amount, function (err, result) {
        console.log(req.body);
        console.log(result);
        if (err) {
            return res.json(err);
        }
        console.log(result)
        res.json({
            'code': 200,
            "Result": result
        })

    });


};
exports.pool = function (req, res) {
    var hex = req.body.hex;
    client.decodeRawTransaction(hex, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result)
        res.json({
            'code': 200,
            "Results": result
        })
    })
}
exports.amount = function (req, res) {
    var account = req.body.account;
    client.getBalance(account, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        });
    })


}
exports.AddressByAccount = function (req, res) {
    var account = req.body.account;
    client.getAddressesByAccount(account, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result)
        res.json({
            'code': 200,
            "Results": result
        })
    });
}
exports.pool = function (req, res) {
    var hex = req.body.hex;
    client.decodeRawTransaction(hex, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result)
        res.json({
            'code': 200,
            "Results": result
        })
    })
}
exports.valid = function (req, res) {
    console.log("i am here");
    var address = req.body.address;
    client.validateAddress(address, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        })
    });
}
/////move from one account to another
exports.move = function (req, res) {
    var accountFrom = req.body.fromAccount;
    var accountTo = req.body.toAccount;
    var amount = req.body.amount;
    client.move(accountFrom, accountTo, amount, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        });
    })
}
exports.amount = function (req, res) {
    var account = req.body.account;
    client.getBalance(account, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        });
    })


}
exports.sendToAddress = function (req, res) {
    var address = req.body.address;
    var amount = req.body.amount;
    client.sendToAddress(address, amount, function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        })
    })
}
exports.listofAccounts = function (req, res) {
    client.listAccounts(function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        })
    })
}
exports.blockcount = function (req, res) {
    client.getBlockCount(function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        })
    })
}
exports.getinfo = function (req, res) {
    client.getInfo(function (err, result) {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        res.json({
            'code': 200,
            "Results": result
        })
    })
}