'use strict';

const dcrcoin = require('node-dcr-rpc');
const Utils = require('../../lib/utils');
//const Config = require('config');
//const fs = require ("file-system");


var dcrd = new dcrcoin.Client({
    host: '127.0.0.1',
    dcrdPort: 19109, // dcrd port
    dcrWalletPort: 19110, // dcrwallet port
    user: 'Manish',
    pass: 'Manish',
    ssl: true
   // ,sslCa: fs.readFileSync('/Users/vishaljain/Library/Application Support/Dcrd/rpc.cert')
  });

  exports.demo = function(req,res)
  {          
    dcrd.getinfo(function(err, info){
        if (err) return console.log(err);
        console.log('getinfo:', info);
      });
      
}  


/**
 * Returns array of unspent transaction inputs in the wallet
 *
 * @return {Array} unspent transactions
 */
const listUnspent = async () => {
    console.log("&&&&&&&&&&&&&&&&&&&")
    try {
        let unspent = await dcrd.wallet.listunspent();
        console.log("*******************",unspent)
        return unspent;
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
        const fee = await dcrd.wallet.estimateSmartFee(6);
        if (fee['errors'])
            fee['feerate'] = 0.00100397;

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
////pending
const createRawTransaction = async(transactions, sendTo, amount, fee ) => {

    if (fee) {
        var txFee = Utils.round(fee , '8');
        amount = amount - txFee;
        amount = Utils.round(amount, '8');
        console.log("amount+++++++",amount)
        
    }

    try {
        if (txFee) {
            let transactionFee = await dcrd.wallet.settxfee(txFee);
            //console.log("txfee=======>",txFee)
        }
        //console.log("$$$$$$$$$$$$$",transactions)
        let rawtxid = await dcrd.createrawtransaction(transactions, {[sendTo] : amount });
        console.log("rawtxid===============>",rawtxid)
        console.log("txfeeeeee",txFee)
        
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

    try {
        if (changeAddress) {
            let frt = await client.fundRawTransaction(rawTransaction, {"changeAddress" : changeAddress});
            return frt;
        }
        else {
            let frt = await client.fundRawTransaction(rawTransaction);
            return frt;
        }
    }
    catch (err) {
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
        let signedTransaction = await dcrd.wallet.signrawtransactions(rawTransaction);
        console.log("signedRawTransaction+++++++",signedTransaction);
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
    try {
        let sendTransactions = await dcrd.sendrawtransaction(signedTransaction);
        console.log("sendTrasaction ========>",sendTransactions)
        return sendTransactions;
    }
    catch (err) {
        console.log(err);
    }
}
/////////////////////Opened a wallet////////////////////////////////////////
exports.wallet = function(req, res) {
    var passphrase = req.body.passphrase;
    var timeout = req.body.timeout;

    dcrd.wallet.walletpassphrase(passphrase,timeout, function(err, address) {
      if (err) {
         console.error(err);
        return  res.json({"code":200,"Results":"Invalid passphrase for master private key"})
      }
      console.log("Your wallet is successfully openend for : "+timeout+" seconds");
      res.json({'code': 200, "Your wallet is successfully openend for (seconds) ": timeout})
    });
};


//////////Get a new account ///////////////////////////
exports.newAccount = function(req, res) {
    var account = req.params.account;

    dcrd.wallet.createnewaccount(account, function(err, result) {
      if (err) {
         console.error(err);
        return  res.json({"Error":err,"Message":"Sorry!!! Account with the same name already exists"})
      }
      console.log("Your new account is created successfully.");
      res.json({'code': 200, "Your new account is successfully created ": account})
    });
};

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
    var account = req.params.account;

    dcrd.wallet.getaccountaddress(account, function(err, address) {
      if (err) {
         console.error(err);
         return res.json({'error': err , "Account not found ": account});
      }
      
      console.log("Your address of account : "+account+" is",address);
      res.json({'code': 200, "address": address})
    });
};
 

///Get a new address accourding to an given Account///

exports.generateNewAddress = function(req, res) {
    var account = req.params.account;

    dcrd.wallet.getnewaddress(account, function(err, address) {
      if (err) {
        return console.error(err);
      }
      console.log("Your new  address of account : "+account+" is",address);      
      res.json({'code': 200, "address": address})
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
exports.balance = function(req,res){
    var account = req.params.account;
    dcrd.wallet.getbalance(account,function(err,result){
        if(err){
            console.log(err)
            return res.json({"Results":"Account name not found",'Error':err});
        }
        console.log(result);
        res.json({'code':200,"balance":result});
    })
  
  
  }


///Get list of addresses by account

exports.AddressByAccount = function(req,res) {
    var account = req.params.account;
    dcrd.wallet.getaddressesbyaccount(account,function(err,result) {
        if (err) {
            return res.json(err);
        }
        console.log(result)
       res.json({'code':200,"Results":result})

    });

}


//////////Get balance of an address //////////////

exports.getBalance_addr = function(req, res) {
    var address = req.params.address;

    dcrd.wallet.listunspent(function(err, unspent) {
        console.log("ListUnspent++++++++##########",unspent)
         if (err) {
             console.log(err)
             return res.json({"code":err,"Result":"sorry!!!!!"})
         }
        var unspentBalance = unspent.filter((unspent) => unspent.address == address );
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",unspentBalance)
        var balance = 0 ;
        if (unspentBalance.length) {
            for (var transactions in unspentBalance) {
                balance += unspentBalance[transactions].amount;
            }
        }
        balance = Utils.round(balance, '8');
      console.log("Your balance of address : "+address+" is",balance);        
        res.json({responseCode: 200, responseMessage:"Success","balance": balance});
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
exports.getReceivedByAccount = function(req, res) {
    var account = req.params.account;

    dcrd.wallet.listtransactions(function(err, deposits) {
       console.log("Deposits++++++++##########",deposits)
        if (err) {
            console.log(err)
            return res.json({"code":err,"Result":"Transactions are not yet grouped by account"})
        }

        var deposit = deposits.filter((deposits) => deposits.account == account );
        console.log("Deposits of an Account ++++++++++++++++++++++++++++++++++++++++++++++",deposit);
        if (deposit.length) {
            console.log("Deposits Length *******",deposit.length)
            var depositSubet = [];
            for (var get in deposit) {
                var subset = (({ address,txid, amount, confirmations, category , account }) => ({ address,txid, amount, confirmations, category , account }))(deposit[get]);
                depositSubet.push(subset);
            }
            res.json({responseMessage:"Deposits",depositSubet});
        }
        else{
            
            res.json({code:"Sorry !!!!!! No deposits yet"})
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
exports.performTransfer = function(req, res) {

    var account = req.params.account;

    dcrd.wallet.listunspent(function(err, listunspent) {
       //console.log("ListUnspent++++++++##########",listunspent)
        if (err) {
            console.log(err)
            return res.json({"code":err,"Result":"sorry!!!!!"})
        }
        
        var sendTransactions = listunspent.filter((listunspent) => listunspent.address == req.body.SendFrom );
        var listTransactions = [];
        var transactionAmount = 0;
        //console.log("Deposits of an Account ++++++++++++++++++++++++++++++++++++++++++++++",sendTransactions);
        if (sendTransactions.length) {
            //console.log("sendTransaction Length @@@@@@@@@@@@",sendTransactions.length)
                    for (var transactions in sendTransactions) {
                        listTransactions.push({
                            'txid': sendTransactions[transactions].txid,
                            'vout': sendTransactions[transactions].vout,
                            'tree': sendTransactions[transactions].tree
                        });
                        //console.log("listTransaction1!!!!!!!!!!!!!!!!!!!!!!!",listTransactions)
                        transactionAmount += sendTransactions[transactions].amount;
                   
                        console.log("trasactionAmount%%%%%%%%%%%%%%%%%",transactionAmount)
            }
            //calculateTxFee(listTransactions.length, 1, 6).then(fee => {
                //console.log("Fee calculate_________________",fee);
                createRawTransaction(listTransactions, req.body.SendTo, transactionAmount, 0.001).then(rawtxid => {
                    console.log("createRawTransactions***************",rawtxid)
                    signRawTransaction(rawtxid).then(signedTransaction => {
                        sendRawTransaction(signedTransaction['hex']).then(sendTransactions => {

                             res.json({
                                'code': 200,
                                'tx-hash' : sendTransactions,
                                'fee': Utils.round(fee, '8'),
                                'sent-amount': transactionAmount
                             });
                        });
                    });
                });
           // });
        }
        else{
            
            res.json({code:"Sorry !!!!!! No deposits yet"})
        }

    })

    
    
};

/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
exports.performWithdraw = function(req, res) {

    
    dcrd.wallet.listunspent(function(err, listunspent) {
        //console.log("ListUnspent++++++++##########",listunspent)
         if (err) {
             console.log(err)
             return res.json({"code":err,"Result":"sorry!!!!!"})
         }
        
        var sendTransactions = listunspent.filter((listunspent) => listunspent.address == req.body.SendFrom );
        var listTransactions = [];
        var transactionAmount = 0;
       // console.log("sendTransaction@@@@@@@@@@@@@@@@@@@@",sendTransactions)
        if (sendTransactions.length) {
            for (var transactions in sendTransactions) {
                listTransactions.push({
                    'txid': sendTransactions[transactions].txid,
                    'vout': sendTransactions[transactions].vout
                });
                console.log("listTrasaction****************",listTransactions)
                transactionAmount += sendTransactions[transactions].amount;
                console.log("transactionAmount+++++++",transactionAmount)
            }

            // Check if sufficient funds available...
            if (req.body.AmountToTransfer < transactionAmount) {
                
                createRawTransaction(listTransactions, req.body.SendTo, req.body.AmountToTransfer, 0.00100397).then(rawtxid => {
                    console.log("createRawTransaction@@@@@@@@@@@@@@@@@@",rawtxid)
                        signRawTransaction(rawtxid).then(signedTransaction => {
                            sendRawTransaction(signedTransaction).then(sendTransactions => {
                                 res.json({
                                    'code': 200,
                                    'tx-hash' : sendTransactions,
                                    'fee': 0.0001
                                   
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
////////



exports.transfer = function(req, res) {
    var account = req.body.fromaccount;
    var address = req.body.todecredaddress;
    var amount = req.body.amount;
    
    dcrd.wallet.sendfrom(account,address,amount,function(err, result) {
        console.log(req.body);
        console.log(result);
      if (err) {
          console.log("error-----",err)
          return res.json({'Error':"Enter the wallet passphrase with walletpassphrase first"});
          //return res.json(err);
      }
     console.log(result)
      res.json({'code': 200, "Result": result})

     
    }); 
    
    
};




  exports.sendToAddress = function(req,res){
      var address = req.body.address;
      var amount = req.body.amount;
      //var walletpassphrase = "Manish";
      dcrd.wallet.sendtoaddress(address,amount,function(err,result){
          if(err){
              console.log(err);
              return res.json({'Error':"Enter the wallet passphrase with walletpassphrase first"});
          }
          console.log(result);
          res.json({'code':200,"Results":result})
      })
  }


  



  

  