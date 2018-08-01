

console.log("lkjk")
const Web_3 = require('web3')
const crypto = require('crypto')
const buf = crypto.randomBytes(128); //minimum 64 Bytes
// console.log(
// `${buf.length} bytes of random data: ${buf.toString('hex')}`);
let entropy = buf.toString('hex')
let web3 = new Web_3(new Web_3.providers.HttpProvider('https://ropsten.infura.io/o9zh2dYZcsUg2tUIMvg9'))
let web3ws = new Web_3(new Web_3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))
//wss://mainnet.infura.io/ws
//wss://ropsten.infura.io/ws
//wss://rinkeby.infura.io/ws   
//new Web3( new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'))
let Tx = require('ethereumjs-tx');
let privateKey = new Buffer('f9e71c81c3214c4ae5a069bdc4fa9dcee4585685eea1da60c618a5504f0a40ac', 'hex')

let getBalance = (address, cb) => {

    web3.eth.getBalance('0x887E002790Ad9455E0a276484E5df1E2359586ce')
      .then((data) => {
        console.log("getBalance function data--->>", data, web3.utils.fromWei(data, 'ether'))
        console.log("data", data)
        return cb(data)
      });
  },
  getCurrentGasPrice = (cb) => {
    web3.eth.getGasPrice()
      .then((currentGasPrice) => {
        console.log("gass")
        console.log("current gas price", currentGasPrice)
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
  // signTxn = (toAddr, fromAddr, value, cb) => {
  //   estGas(toAddr, fromAddr, value, (estmdGas) => {
  //     getCurrentGasPrice((currentGasPrice) => {
  //       web3.eth.signTransaction({
  //         from: fromAddr,
  //         gasPrice: currentGasPrice,
  //         gas: estmdGas,
  //         to: toAddr,
  //         value: value,
  //         data: ""
  //       }).then((signedTxn) => {
  //         console.log("----------->>", signedTxn)
  //         return cb(signedTxn)
  //       }).catch(err => console.log("errrrr", err))
  //     })
  //   })
  // },

  getTxnCountForNonce = (addr, cb) => {
    console.log("sdsd")
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

  
  //'0x' + serializedTx.toString('hex')
  sendSignedTxn = (rawTxn, cb) => {
    web3.eth.sendSignedTransaction(rawTxn)
      .then((receipt) => {
        console.log('receipt', receipt)
        cb(receipt)
      }).catch(console.log);
  }
  // scaryTxn = (toAddr, fromAddr, value, cb) => {
  //   console.log("came here")
  //   web3.eth.sendTransaction({
  //       from: fromAddr,
  //       to: toAddr,
  //       value: value
  //     })
  //     .then(function (receipt) {
  //       console.log("receipt", receipt)
  //       return cb(receipt)
  //     }).catch(console.log);
  // };

//    var subscription = web3.eth.subscribe('logs', {
//      address: '0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6',
//      topics: ['0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6']
//  }, function(error, result){
//      console.log("========>>",error, result)
//      if (!error)
//          console.log(log);
//  });
//  console.log("------------------")
//  const subscription = web3ws.eth.subscribe('logs', {
//    address: web3.utils.toHex('0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6'),
//    topics: [null]
//  }, (error, blockHeader) => {
//    if (error) return console.error(error);
//    console.log('Successfully subscribed!', blockHeader);
//  }).on('data', (blockHeader) => {
//    console.log('data: ', blockHeader);
//  });
 // unsubscribes the subscription
//  subscription.unsubscribe((error, success) => {
//    if (error) return console.error(error);
//    console.log('Successfully unsubscribed!');
// //  });
//  var subscription = web3ws.eth.subscribe('logs', {
//    address: '0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6',
//    topics: [null]
//  }, function(error, result){
//    if (!error)
//        console.log("Yippeeeeeeeee00",error,result);
//  })
//  .on("data", function(log){
//    console.log("Yippeeeeeeeee11",log);
//  })
//  .on("changed", function(log){
//    console.log("Yippeeeeeeeee22",log)
//  });
//  // unsubscribes the subscription
//  subscription.unsubscribe(function(error, success){
//    if(success)
//        console.log('Successfully unsubscribed!');
//  });
//  web3.eth.getTransactionCount("0x078D39E2C69516B6265b028F314A8c9D5f532D66")
//  .then((log)=>{console.log("11119999",log)});
//  var subscription = web3ws.eth.subscribe('pendingTransactions', function(error, result){
//    if (!error)
//        console.log(result);
//  })
//  .on("data", function(transaction){
//    console.log(transaction);
//  });

//  // unsubscribes the subscription
//  subscription.unsubscribe(function(error, success){
//    if(success)
//        console.log('Successfully unsubscribed!');
//  });
 getBalance("0x078D39E2C69516B6265b028F314A8c9D5f532D66", (data) => {
   console.log("1122", data)
 })
 getBalance("0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6", (data) => {
   console.log("1122", data)
 })
getBalance("0xa0601e58d52550E4393165D5D872f0EEE2c0C521", (data) => {
  console.log("1122", data)
})

// signTxn("0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6", "0x078D39E2C69516B6265b028F314A8c9D5f532D66", "1000000000000000", (signedData) => {
//   console.log("@@@", signedData)
// })

 signTxnSig6("0xd2Ad3d71D6d27232d464F0a3b1f685e6Cf0Fa1e6", "0x078D39E2C69516B6265b028F314A8c9D5f532D66", 8 , (signedData) => {
   sendSignedTxn(signedData,(receipt)=>{
     console.log("Success", receipt)    
   })
 })