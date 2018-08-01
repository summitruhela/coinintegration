const commonFile = require('./../../global-files/common-file')
const jwt = require('jsonwebtoken')

const async = require('async')
const IOTA = require('iota.lib.js');
const request = require('request')
let provider = "http://localhost:14266";
//"http://localhost:14266";//"https://iotanode.us:443"; //"http://node04.iotatoken.nl:14265" //"http://iotahosting.org:14265";//   //
//https://nodes.testnet.iota.org:443    testnet-->>https://nodes.iota.cafe:443  getBalance-> http://iota.thathost.net:443
// remoteCurl(iota, `https://powbox.testnet.iota.org`, 100)
const iota = new IOTA({
    "provider": provider
});

getIntTkn = (serverId) => {
        return jwt.sign({
            _id: serverId
        }, config.get('jwtSecretKey'))
    },

    generate_addr_mainNet = (cb) => {
        let seed = commonFile.getTryteSeed();
        // console.log("##############", iota);
        iota.api.getNewAddress(seed, {
            index: 0,
            total: 1,
            security: 2,
            checksum: true
        }, (err, result) => {
            console.log("==>>", err, result);
            return cb(seed, result[0])
        })
    },

    get_balance = (address, cb) => {
        iota.api.getBalances(address, 100, (err, result) => {
            console.log("==>>balance data", err, result);
            if (err) {
                console.log(err)
                return cb(null)
            }
            return cb(Number(result.balances[0]))
        })
    },

    get_inputs = (seed, cb) => {
        iota.api.getInputs(seed, (err, success) => {
            console.log("err, success=>", err, success)
            return cb(success.inputs);
        })
    },

    payment_method = (seed, send_from, send_to, amount, change_addr, cb) => {
        let options = {},
            message = iota.utils.toTrytes('official_transaction.');
        transfers_raw = [{
            value: amount, //all values in IOTA.
            address: send_to,
            message: message //optional
        }];
        get_inputs(seed, (inputs) => {
            options = {
                inputs: inputs,
                address: change_addr
            }
            console.log("here", inputs)
            iota.api.sendTransfer(seed, 6, 14, transfers_raw, options, (error, success) => {
                if (error) {
                    console.log(error)
                    return cb("error");
                } else {
                    console.log(success)
                    return cb(success)
                }
            });
        })
    },
    connect = (cmd, cb) => {

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(cmd).length
            },
            json: cmd
        };
        return cb(cmd)

    }

//  get_inputs("JLABTDFLLRCVKYUDYAXNCQUBJTGZYRBRPLAGRQXGNDRAURJQ9URGOWQDJLPWOEUHJVPTUXRXVBNAMVNLD",(inputs)=>{
//      console.log("==>>", inputs);
//  })


//  generate_addr_mainNet((data1, data2) => {
//      console.log("data obtained is", data1, data2);
//  })


//  iota.api.findTransactionObjects({ addresses: ["DMFHHARFVECWHYOIZLKAXJQNDMYYMTGLWWWXOBWV99VOXJBLPHLCJILZS9HKKKH9RFDWMZLEVBUFMXBOCBFOTNYJUA"]}, (err, success)=>{
//      // console.log("==>>", err, success)
//      let deposits = [], bundles_added = {};
//      success.map((element)=>{
//          if(element.value > 0 && !(element.bundle in bundles_added)){
//              deposits.push({ hash: element.hash, value: element.value, timestamp: element.timestamp});
//              bundles_added[element.bundle] = "added";
//          }
//      })
//      console.log(deposits)
//  })
// // EEYYINBWGPMTT9I9EDLGKAXJJCCMZUOHFUCZHLYSWOECXCQALIUXUFLNRJYRGWOAXZYLZPJMSPEOF99CYYDDIQRRLY
//  let send_from = "99KCIBABTEPUAUKCSBLDVJVFVAOGRYCH9ADWWIQPGXX9BNAUVHJFBMUYDPESBQIYPVMBPRYUZJRPISBRAIOPL9LTWA",
//      send_to = "NOVIZWMREBDYNJL9WD9BEHYTMRJPL9ZWHXOZHSTBKAZKGQCTUYGWOBRVNIPEMHWCBRPCYW9PKHDZRG9ZCFESWON9EX",
//      change_addr = "";
//  payment_method("NTEQUYMDZVQGPBLBGCJDHHCRAUGBDPEPVSVRVWMIBZXQHWJSMUWNWGICPPEDWKVIXVVEWRSQHGAWKHCIU", send_from, send_to, 0, change_addr, (data) => {
//      console.log("==>>", data);
//  })
// // CRRSVOGMAUOYVCRQBKSTT9LIDSZYLLBWKIMHPKSDSHVRZYEYXZLZKZHGPEBYWVEXMQCPKWFE9VAXYW9AGCUFPRTGPM
//  const trytes ='NOVIZWMREBDYNJL9WD9BEHYTMRJPL9ZWHXOZHSTBKAZKGQCTUYGWOBRVNIPEMHWCBRPCYW9PKHDZRG9ZC'
//  const message = iota.utils.toTrytes('Hello World!')
//  const transfers = [{
//      value: 0,
//      address: trytes,
//      message: message
//  }]
//  iota.api.sendTransfer(trytes, 3, 9, transfers, (error, success) => {
//      if (error) {
//          console.log(error)
//      } else {
//          console.log(success)
//      }
//  })







// let temp_arr = ["XNLJA99ESCFJLSAEVYZCHOKYYQMSVIMSLAQQHXUDZEOBIWTXVUKMLXKP9OWCLCKYBHEOUAUQIU9GNCOJB"];
// iota.api.isReattachable(temp_arr, (err, success)=>{
//     console.log("==>>reatt", err, success)
// })
// temp_arr.map((elem)=>{
// iota.api.replayBundle("WWCQHOUFGRQKMMTFJVOSSSAQTMJZQTPBYZAZJQH9QYAYADXCPFFUCIYXTPJWUBJMCAYQVMGTKYMU99999", 44, 14, (err, txs) => {
//     // const tailHash = txs[0].hash
//     console.log(err, txs)
// })
// })

// get_inputs("NTEQUYMDZVQGPBLBGCJDHHCRAUGBDPEPVSVRVWMIBZXQHWJSMUWNWGICPPEDWKVIXVVEWRSQHGAWKHCIU",(inputs)=>{
//     console.log("==>>", inputs);
// })
module.exports = {


    // "verifyAuthToken": (req, res, next) => {
    //     console.log("sending directly to the api")
    //     if (!req.headers.auth_token) {
    //         return commonFile.responseHandler(res, 400, "No token provided.")
    //     }
    //     commonFile.jwtDecode(req.headers.auth_token, (decoded) => {
    //         if (decoded) {
    //             next();
    //         } else {
    //             return commonFile.responseHandler(res, 400, "Invalid token.")
    //         }
    //     })
    // },

    // "get_auth_token": (req, res) => {
    //     if (!req.query.uniqueId) {
    //         return commonFile.responseHandler(res, 400, "Parameters missing.")
    //     }
    //     return commonFile.responseHandler(res, 200, "Success.", jwt.sign({ id: req.query.uniqueId }, config.get('jwtSecretKey'), { expiresIn: '1h' }))
    // },

    "generate_new_addr": (req, res) => {
        generate_addr_mainNet((seed, addr) => {
            console.log(seed, addr)
            return commonFile.responseHandler(res, 200, "Success.", {
                seed: seed,
                address: addr
            })
        })
    },

    "get_addr_info": (req, res) => {
        get_balance([req.query.address], (balance_info) => {
            console.log("==>>balance_info", balance_info)
            if (balance_info !== "error") {
                return commonFile.responseHandler(res, 200, "Balance obtained successfully.", balance_info);
            } else {
                return commonFile.responseHandler(res, 400, "Address is not present on the network.");
            }
        })
    },

    "deposit_history": (req, res) => {
        iota.api.findTransactionObjects({
            addresses: [req.query.address]
        }, (err, success) => {
            console.log("txn data==>>", success)
            let deposits = [],
                bundles_added = {};
            success.map((element) => {
                if (element.value > 0 && !(element.bundle in bundles_added)) {
                    deposits.push({
                        hash: element.hash,
                        value: element.value,
                        timestamp: element.timestamp
                    });
                    bundles_added[element.bundle] = "added";
                }
            })
            console.log(deposits)
            return commonFile.responseHandler(res, 200, "Deposits found successfully.", deposits);
        })
    },

    "payment_method": (req, res) => {
        console.log("==>>", req.query);
        let hash = '',
            seed = req.query.seed,
            send_from = req.query.send_from.substring(0, 81), //req.query.send_from,
            send_to = req.query.send_to.substring(0, 81),
            change_addr = req.query.change_addr.substring(0, 81),
            amount = req.query.amount;
        console.log("====>>sendFrom", send_from);
        payment_method(seed, send_from, send_to, amount, change_addr, (txn_success) => {
            console.log("==>>transaction result", txn_success);
            hash = txn_success[0].hash;
            return commonFile.responseHandler(res, 200, "Transaction submitted successfully.", {
                tx_hash: hash
            })
        })
    },

    "get_server_info": (req, res) => {
        iota.api.getNodeInfo((e, r) => {
            if (e) res.json(e);
            else res.json(r);
            console.log("err,result==>>", e, r)
        })
    },
    "getTransactionsToApprove": (req, res) => {
        console.log("===========>>>>>>>>>", req.query.depth)
        iota.api.getTransactionsToApprove(req.query.depth, (result) => {
            //   if(err)  res.json(err);
            if (result) res.send({
                responseCode: 200,
                data: result
            })
        })
    },
    "getBalances": (req, res) => {
        var request = require('request');

        var command = {
            'command': 'getBalances',
            'addresses': ['MYJEJORIMJKJOFHMY9NIYXRNMLI9GKCRQSEQ9HWRFBEJVAVEKQAOFYYLCNIDEJLEDPXEZCRUMJQTYRJNCUJLGXQ9CX'],
            'threshold': 100
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                res.json(data)
            }
        });
    },
    'attachToMesh': (req, res) => {
        var command = {
            'command': 'attachToMesh',
            'trunkTransaction': 'UHJOHFZK9UNVSTXZRRROVFRLDMLWLILGTSOIDQKRRCRXZMSAI9SFRJYIGCM9PEEJQZHHIKLDMBY999999',
            'branchTransaction': 'MYUDAOXEJC9NKBXV9PTFSZTNJOZEYPPPZHXH9UMJRWIVMCZJXKJUKJTUROHYVVGPLKJCHGULYD9999999',
            'minWeightMagnitude': 18,
            'trytes': ['RAWTRYTES']
        }

        var options = {
            url: 'http://localhost:14266',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(command).length
            },
            json: command
        };

        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            }
        });
    },

}
