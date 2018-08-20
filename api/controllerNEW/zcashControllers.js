'use strict';

const Client = require('bitcoin-core');
const Utils = require('../../lib/utils');
//const Config = require('config');
//const Zcash = require('zcash');
// let zcash = new Zcash({           "username": "username", 
//                                     "password": "password",
//                                     "port": 18232,
//                                     "host": "172.16.1.128",
//                                     "network": "testnet" })
//const client = new Client(Config.get('Litecoin.testnet'));
let client = new Client({           "username": "username", 
                                    "password": "password",
                                    "port": 18232,
                                    "host": "172.16.1.128",
                                    "network": "testnet" })

/**
 * Returns array of unspent transaction inputs in the wallet
 *
 * @return {Array} unspent transactions
 */
const listUnspent = async () => {
    console.log("Enter in ListUnspent #####################")
    try {
        let unspent = await client.listUnspent();
        //console.log(unspent)
        return unspent;
    }
    catch (err) {
        //Failed to fetch unspent transactions.
        console.log(err);
        
    }

}


/**
 * Returns array of unspent transaction inputs in the wallet
 *
 * @return {Array} unspent transactions
 */
const listTransaction = async () => {
    console.log("Enter in ListTransaction #####################")
    try {
        let transaction = await client.listTransactions();
        //console.log("&&&&&&&&&&&&&&&&&&&",transaction)
        return transaction;
    }
    catch (err) {
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
const calculateTxFee = async(input, output, confirmations) => {
    try {
        const fee = await client.estimateSmartFee(6);
        if (fee['errors'])
            fee['feerate'] = 0.00010024;

        var txFee = (((input * 148 + output * 34 + 10) + 40) / 1024) * fee['feerate'];
        return txFee;
    }
    catch (err) {
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
const createRawTransaction = async(transactions, sendTo, amount, fee) => {

    if (fee) {
        var txFee = Utils.round(fee, '8');
        amount = amount - txFee;
        amount = Utils.round(amount, '8');
    }

    try {
        if (txFee) {
            let transactionFee = await client.setTxFee(txFee);
        }
        let rawtxid = await client.createRawTransaction(transactions, {[sendTo] : amount });
        return rawtxid;
    }
    catch (err) {
        console.log(err);
    }
}


/**
 * @param  {[type]}
 * @return {[type]}
 */
const fundRawTransaction = async(rawTransaction, changeAddress) => {
console.log("rawTransaction checking --------",rawTransaction)
    try {
        if (changeAddress) {
            let frt = await client.fundRawTransaction(rawTransaction);
            console.log("FundrawTrasaction +++++++",frt)
            return frt;
        }
        else {
            let frt = await client.fundRawTransaction(rawTransaction);
            console.log("FundrawTrasaction +++++++",frt)            
            return frt;
        }
    }
    catch (err) {
        //console.log("FundrawTrasaction +++++++",frt)        
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
const signRawTransaction = async(rawTransaction) => {

    try {
        let signedTransaction = await client.signRawTransaction(rawTransaction);
        return signedTransaction;
    }
    catch (err) {
        console.log(err);
    }
}


/**
 * Submits raw transaction (serialized, hex-encoded) to local node and network.
 *
 * @param  {String} Signed transaction
 * @return {String} Transaction Id
 */
const sendRawTransaction = async(signedTransaction) => {
    console.log("Enter in Send raw transaction =====>")
    console.log("signed transaction>>>>>>>>>>>>>",signedTransaction)
    try {
        let sendTransactions = await client.sendRawTransaction(signedTransaction);
        console.log("sendrawtransaction ========>",sendTransactions)
        return sendTransactions;
    }
    catch (err) {
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
exports.generateAddress = function(req, res) {

    client.getNewAddress(function(err, address) {
      if (err) {
        return console.error(err);
      }
      console.log("Your address is",address);
      res.json({'code': 200, "address": address})
    });
};
 

///Get a new address accourding to an given Account///

exports.generateZAddress = function(req, res) {
    zcash.z_getnewaddress().then(addresses => {
            console.log("Your new  Z address  is",addresses);      
            res.json({'code': 200, "address": addresses})
            .catch(err =>{
                console.log("Error",err);      
                res.json({'code': 500, "Error": err})
            })
        
        
    });
};



////////////

// exports.getBalance = function(req,res){
//     var address = req.params.address;
//     zcash.z_getbalance(address).then(balance => {
//         console.log("Your Balance is",balance);      
//         res.json({'code': 200, "Balance": balance})
//     }).catch(err =>{
//         console.log("Error",err);      
//         res.json({'code': 500, "Error": err})
//     })
  
  
 // };



  exports.getBalance = function(req, res) {
    var address = req.params.address;

    listUnspent().then(unspent => {
        //console.log("Unspents ------",unspent)
        var unspentBalance = unspent.filter((unspent) => unspent.address == address );
        console.log("unspentBalance -----> ", unspentBalance)
        var balance = 0;
        if (unspentBalance.length) {
            for (var transactions in unspentBalance) {
                balance += unspentBalance[transactions].amount;
            }
        }
        balance = Utils.round(balance, '8');
        res.json({'code': 200, "balance": balance});
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
exports.getReceivedByAddress = function(req, res) {
    var address = req.params.address;

    listTransaction().then(transaction =>{
        console.log(":::::::::::::",transaction)
        var transactions = transaction.filter((transaction) => transaction.address == address );
        console.log("List of Transaction of Addresss------->",transactions)
        
        if (transactions.length) {
            var transactionSubet = [];
            for (var deposit in transactions) {
                var subset = (({ txid, address , amount, confirmations }) => ({ txid, address , amount, confirmations }))(transactions[deposit]);
                transactionSubet.push(subset);
            }
            res.json({responseMessage:"Deposits",depositSubet});
        }
        // else{
            
        //     res.json({code:"Sorry !!!!!! No deposits yet"})
        // }
        else {
            res.json({responseMessage:"Internal server Error","code": "500"})
        }
    });
    

    // client.listTransactions(function(err, deposits) {
    //     console.log("Deposits --------->",deposits)
    //     if (err) {
    //         return res.json(err)
    //     }
    //     if (deposits.length) {
    //         var depositSubet = [];
    //         for (var deposit in deposits) {
    //             var subset = (({ txid, address , amount, confirmations }) => ({ txid, address , amount, confirmations }))(deposits[deposit]);
    //             depositSubet.push(subset);
    //         }
    //         res.json({responseMessage:"Deposits",depositSubet});
    //     }
    //     // else{
            
    //     //     res.json({code:"Sorry !!!!!! No deposits yet"})
    //     // }
    //     else {
    //         res.json({responseMessage:"Internal server Error","code": "500"})
    //     }
    // });
};




 
// exports.getReceivedByAddress = function(req, res) {
    
//     var address = req.params.address;
//     client.getReceivedByAddress(address).then(result => {
//         console.log("Your new  Z address  is",result);      
//         res.json({'code': 200, "address": result})
//     })
//     .catch(err =>{
//         console.log("Error",err);      
//         res.json({'code': 500, "Error": "Internal Server Error"})
//     })
    
// };

/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.performTransfer = function(req, res) {
console.log("Enter in Transfer API==============================")
    // Get all unspent transactions
    listUnspent().then(unspent => {
        console.log(unspent)
        var sendTransactions = unspent.filter((unspent) => unspent.address == req.body.SendFrom );
        console.log("SendTransaction ---->",sendTransactions)
        var listTransactions = [];
        var transactionAmount = 0;

        if (sendTransactions.length) {
            console.log("Enter in SendTransaction &&&&&&&&&&&&&&&&&&&&&&")
            for (var transactions in sendTransactions) {
                console.log("Method check -----------------------")
                listTransactions.push({
                    'txid': sendTransactions[transactions].txid,
                    'vout': sendTransactions[transactions].vout
                });
                console.log("ListTransaction============>",listTransactions)
                transactionAmount += sendTransactions[transactions].amount;
                console.log("Trasaction amount +++++++++++",transactionAmount)
                
            }

            calculateTxFee(listTransactions.length, 1, 6).then(fee => {
                console.log("calculate tx fee ==================",fee)
                createRawTransaction(listTransactions, req.body.SendTo, transactionAmount, fee).then(rawtxid => {
                console.log("Create raw  ==================",rawtxid)
                   
                    signRawTransaction(rawtxid).then(signedTransaction => {
                        console.log("Siogn raw +++++++++++",signedTransaction)
                        sendRawTransaction(signedTransaction['hex']).then(sendTransactions => {
                            console.log("Send transaction +++++++++++",sendTransactions)

                             res.json({
                                'code': 200,
                                'tx-hash' : sendTransactions,
                                'fee': Utils.round(fee, '8'),
                                'sent-amount': transactionAmount
                             });
                        });
                    });
                });
            });
        }
        else {
            res.json({'code': 500, "message": "No unspent transaction found for given address."});
        }
    });
};


/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.performWithdraw = function(req, res) {

    //SendTo
    //AmountToTransfer
    //ChangeAddress
    var changeaddress = req.body.ChangeAddress ? req.body.ChangeAddress : null;
    // Get all unspent transactions
    console.log("Enter in withdraw API============>>>>>")
    listUnspent().then(unspent => {
        var sendTransactions = unspent.filter((unspent) => unspent.address == req.body.SendFrom );
        console.log("SendTransaction ---->",sendTransactions)
        
        var listTransactions = [];
        var transactionAmount = 0;

        if (sendTransactions.length) {
            console.log("Enter in SendTransaction &&&&&&&&&&&&&&&&&&&&&&")            
            for (var transactions in sendTransactions) {
                console.log("Method check -----------------------")                
                listTransactions.push({
                    'txid': sendTransactions[transactions].txid,
                    'vout': sendTransactions[transactions].vout
                });
                console.log("ListTransaction============>",listTransactions)                
                transactionAmount += sendTransactions[transactions].amount;
                console.log("Trasaction amount +++++++++++",transactionAmount)
                
            }

            // Check if sufficient funds available...
            if (req.body.AmountToTransfer < transactionAmount) {
                //Updated to use the fundRawTransaction method
                createRawTransaction(listTransactions, req.body.SendTo, req.body.AmountToTransfer, null).then(rawtxid => {
                    console.log("Create raw transaction +++++++++++",rawtxid)
                    fundRawTransaction(rawtxid, changeaddress).then(frt => {
                        console.log("frt********************",frt)
                        console.log("Fund raw transaction +++++++++++",rawtxid,changeaddress)                        
                        signRawTransaction(frt['hex']).then(signedTransaction => {
                        console.log("Siogn raw +++++++++++",signedTransaction)                            
                            sendRawTransaction(signedTransaction['hex']).then(sendTransactions => {
                            console.log("Send transaction +++++++++++",sendTransactions)                                
                                 res.json({
                                    'code': 200,
                                    'tx-hash' : sendTransactions,
                                    'fee': frt['fee']
                                 });
                            });
                        });
                    });
                });
            }
            else {
                res.json({'code': 500, "message": "Insufficient Funds!"});
            }
        }
        else {
            res.json({'code': 500, "message": "No unspent transaction found for given address."});
        }
    });
};


