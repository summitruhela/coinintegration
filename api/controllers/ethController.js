var Web3 = require('web3'); 
//console.log("ETH_Controller")
var web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/o9zh2dYZcsUg2tUIMvg9');
//console.log("ETH_Controller")

var commonFile = require('../../global-files/common-file')


//web3.setProvider('ws://localhost:8546')

var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('https://ropsten.infura.io/o9zh2dYZcsUg2tUIMvg9');

let Tx = require('ethereumjs-tx');
let privateKey = new Buffer('f9e71c81c3214c4ae5a069bdc4fa9dcee4585685eea1da60c618a5504f0a40ac', 'hex')
console.log("ETH")

getBalance = (address, cb) => {
  web3.eth.getBalance(address)
    .then((data) => {
      console.log("getBalance function data--->>", data, web3.utils.fromWei(data, 'ether'))
      console.log("data", data)
      return cb(data)
    });
  },
  
    getCurrentGasPrice = (cb) => {
      web3.eth.getGasPrice()
        .then((currentGasPrice) => {
          console.log("gass===>>",currentGasPrice)
          return cb(currentGasPrice)
        })
    },

    estGas = (toAddr, fromAddr, value, cb) => {
      web3.eth.estimateGas({
        from: fromAddr,
        to: toAddr,
        value: value
      }).then((estmdGas) => {
        console.log("==>>", estmdGas)
        return cb(estmdGas)
      }).catch(console.log)
    },

    signTxn = (toAddr, fromAddr, value, cb) => {
      console.log("hitted")
      estGas(toAddr, fromAddr, value, (estmdGas) => {
        getCurrentGasPrice((currentGasPrice) => {
          web3.eth.signTransaction({
            from: fromAddr,
            gasPrice: currentGasPrice,
            gas: estmdGas,
            to: toAddr,
            value: value,
            data: ""
          }).then((signedTxn) => {
            console.log("----------->>", signedTxn)
            return cb(signedTxn)
          }).catch(err => console.log("errrrr", err))
        })
      })
    },


  getTxnCountForNonce = (addr, cb) => {
    web3.eth.getTransactionCount(addr)
      .then((count) => {
        return cb(count)
      });
  },

  
  signTxnSig6 = (toAddr, fromAddr, value, cb) => {
    estGas(toAddr, fromAddr, value, (estmdGas) => {
      getCurrentGasPrice((currentGasPrice) => {
        getTxnCountForNonce(fromAddr, (hardCount) => {
          let rawTx = {
            nonce: web3.utils.toHex(hardCount),
            from: web3.utils.toHex(fromAddr),
            gasPrice: web3.utils.toHex(currentGasPrice),
            gas: web3.utils.toHex(estmdGas),
            to: web3.utils.toHex(toAddr),
            value: web3.utils.toHex(value),
            data: ""
          }
          console.log("Gas used==>>", estmdGas, currentGasPrice, estmdGas * currentGasPrice)
          console.log("---------------------->>", rawTx)
          var tx = new Tx(rawTx);
          tx.sign(privateKey);
          let serializedTx = tx.serialize();
          console.log("serializedTx", serializedTx)
          let cbData = '0x' + serializedTx.toString('hex')
          console.log("cb Data is ", cbData)
          cb(cbData)
        })
      })
    })
  },
  sendSignedTxn = (rawTxn, cb) => {
    console.log("send")
    web3.eth.sendSignedTransaction(rawTxn)
      .then((receipt) => {
        console.log('receipt---------->', receipt)
        cb(receipt)
      }).catch(console.log);
  },
  
  createAccount= (cb) => {
            console.log("createAccount")
            var accountDetail = accounts.create()
            cb(accountDetail)
        },
  
module.exports = {

  "getBalance": (req, res) => {
    getBalance("0x078D39E2C69516B6265b028F314A8c9D5f532D66", (Balance) => {
      if (Balance != "error")
        return commonFile.responseHandler(res, 200, "success", {data: Balance})
      else
        return commonFile.responseHandler(res, 400, "Internal Server Error")
    })
  },

  "getGasPrice":(req,res)=>{
    getCurrentGasPrice((err,result)=>{
      if(err)
      return commonFile.responseHandler(res,400,"internal Server Error",{data:err})
      else 
      return commonFile.responseHandler(res,200,"Success",{data:result})
    })
  },

  "estGas":(req,res)=>{
    estGas(req.query.toAddr,req.query.fromAddr,req.query.value ,(err,result)=>{
      if(err) return commonFile.responseHandler(res,400,"internal server Error", {data:err})
      else return commonFile.responseHandler(res, 200,"succesfully done gas", {data:result})

    })
  },
  "signTx":(req,res)=>{
    console.log("3423323")
      signTxn(req.query.toAddr,req.query.fromAddr,req.query.value, (err,result)=>{
      if(err) return commonFile.responseHandler(res,400 , "Internal server error", {data: err})
      else return commonFile.responseHandler(res,200, "Successfull done", {data: result})
      })
  },

  "getTxnCountForNonce":(req,res)=>{
    getTxnCountForNonce(req.query.address,(err,result)=>{
      if(err) return commonFile.responseHandler(res, 400, "Internal server Error",{data:err})
      else 
      {
        console.log(result)
        return commonFile.responseHandler(res, 200,"Successfull done", {data: result})
      }
    })
  },
  "signTxnFast":(req,res)=>{
    console.log("signTransaction")
    signTxnSig6(req.query.toAddr,req.query.fromAddr,req.query.value, (signData)=>{
      sendSignedTxn(signData,(err,result)=>{
        if(result!=="error") return commonFile.responseHandler(res,400,"internal server error", {data:err})
        else return commonFile.responseHandler(res,200,"Successfull done", {dta})
      })

    })
  },
  "createAccount":(req,res)=>{
    console.log("Create_account")
    createAccount((err,result)=>{
      if(err) return  commonFile.responseHandler(res,400,"Internal server error", {data:err})
      else return commonFile.responseHandler(ress,200 ,"Succesfully done", {data:result})
    })
  }

  
  
}

// module.exports = {

//     getAccounts: (req, res) => {
//         console.log("getAccount")
//         web3.eth.getAccounts()
//             .then(a => {
//                 console.log("==>>", a)
//                 res.json(a)
//             })
//     },

//     getBalance: (req, res) => {
//         console.log("getBalance")
//         web3.eth.getBalance(req.query.address)
//             .then(result => {
//                 console.log(result);
//                 res.json(result)
//             })
//     },

//     createAccount: (req, res) => {
//         console.log("createAccount")
//         var accountDetail = accounts.create()
//         res.json(accountDetail);
//     },

//     signTransaction: (req, res) => {
//         console.log('signTransaction')
//         var tx = {
//             to: "0xdB159c766CE8d86a0A946832354ca0AD301CF686",
//             value: '0',
//             gas: 2000000
//         };
//         var privateKey = "0x7e3da68f446e1bef06bca2208f0daf2b325208d1d66f46badacd7d8202d38c56"

//         web3.eth.accounts.signTransaction(tx, privateKey, (err, result) => {
//             console.log("err--------------------->", err)
//             console.log("result------------------>>", result)
//         });

//     },

//     privateKeyToAccount: (req, res) => {
//         console.log("privateKeyToAccount")
//         var privateKeyToAccount = accounts.privateKeyToAccount(req.query.private)
//         res.json(privateKeyToAccount);
//     },

//     walletInfo: (req, res) => {
//         console.log("walletInfo")
//         var wallet = accounts.wallet
//         console.log(wallet)
//         res.send()
//     },

//     createWallet: (req, res) => {
//         console.log('create Wallet')
//         var createWallet = accounts.wallet.create(req.body.numberOfWallet);
//         console.log(createWallet);
//         res.json(createWallet)
//     },

//     isSync: (req, res) => {
//         console.log("isSync")
//         web3.eth.isSyncing((err, result) => {
//             if (err) console.log("error taken========>", err)
//             else res.json(result);
//         })
//     },
//     defaultAccount: (req, res) => {
//         console.log("defaultAccount")
//         var default_account = web3.eth.defaultAccount == req.query.address;
//         console.log(default_account);
//         res.json(default_account)
//     },
//     prepareTransfer: (req, res) => {
//         console.log("PrepareTransfer")
//         transactionObject = {
//             from: "0x30DEA40C0549F654973838B96145C465AD451623",
//             to: "0xCe700Ad02a800f44839749CB6AAD1D1129C4C11C",
//             value: 0
//         }
//         web3.eth.sendTransaction(transactionObject, (err, result) => {
//             if (err) {
//                 console.log(err)
//                 res.json(err);
//             } else {

//                 console.log(result)
//                 res.json(result)
//             }
//         })
//     },

//     version: (req, res) => {
//         console.log("version of ETH")
//         var version = Web3.version
//         console.log(version)
//         res.json("version->", version)
//     },

//     default: (req, res) => {
//         console.log("default account api")
//         web3.eth.defaultAccount = "0x887E002790Ad9455E0a276484E5df1E2359586ce"
//         console.log("default_account-->")
//     },

//     getGasPrice: (req, res) => {
//         console.log("getGasPrice")
//         web3.eth.getGasPrice()
//             .then(gas => {
//                 console.log(gas)
//                 res.json(gas)
//             })
//     },

//     getHashRate: (req, res) => {
//         console.log("getHashRate")
//         web3.eth.getHashRate()
//             .then(hash => {
//                 console.log("------>>>", hash)
//             })
//     },

//     getBlock: (req, res) => {
//         console.log("api of block count")
//         web3.eth.getBlock(48, (err, result) => {
//             if (err) {
//                 console.log("err-->", err)
//                 res.json(err)
//             } else {
//                 console.log("getblock", result)
//                 res.json(result)
//             }
//         })
//     },

//     sign: (req, res) => {
//         console.log("sign api called")
//         web3.eth.sign("0x887E002790Ad9455E0a276484E5df1E2359586ce", "0x2d11a47362c21453438df102d94821fa6c6eb194ff4182a4330a322817234274", (err, result) => {
//             if (err) {
//                 console.log("err", err)
//                 res.json(err)
//             } else {
//                 console.log(result)
//                 res.json(result)
//             }
//         })
//     },

//     addWallet: (req, res) => {
//         console.log("API called addWallet")
//         var account = "0x2d11a47362c21453438df102d94821fa6c6eb194ff4182a4330a322817234274"
//         web3.eth.accounts.wallet.add(account, (err, result) => {
//             console.log(err, result)
//         });

//     },

//     createPersonalAccount: (req, res) => {
//         console.log("get CreatePersonal acccount")
//         var web3_extended = require('web3_extended');

//         var options = {
//             host: '/home/administrator/.ethereum/geth.ipc',
//             ipc: true,
//             personal: true,
//             admin: false,
//             debug: false
//         };

//         var web3 = web3_extended.create(options);

//         web3.personal.newAccount("password", function (error, result) {
//             if (!error) {
//                 console.log(result);
//             }
//         });
//     }
// }