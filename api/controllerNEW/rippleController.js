//var moneroWallet = require('monero-nodejs');
const request = require('request');
//var wallet = new moneroWallet("127.0.0.1", 28080);

//const Wallet = require('monero-rpc').Wallet

//const wallets = new Wallet('http://127.0.0.1:28080');

module.exports = {

    /////////////////////////////////////////////server_info//////////////////////////////////////////////////
    server_info: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "server_info",
            "params": {
                
            }
        }

        var options = {
            url: 'https://s.altnet.rippletest.net:51234/json_rpc',
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
                res.send({"responseCode":200,"Server_info":JSON.parse(data)});
                
            }
        });

    },

    /////////////////////////////////////////////Get account Info//////////////////////////////////////////////////

    account_info: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "account_info",
            "params": 
                [
                    {"account": req.params.account}
                ]
                
            
        }

        var options = {
            url: 'https://s.altnet.rippletest.net:51234/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                //console.log(data);
                var jsonData = JSON.parse(response.body);
                var balance = jsonData.result.account_data.Balance/1000000;
                res.send({"responseCode":200,"Balance":balance});
            }
        });


        

    },

    /////////////////////////////////////////////Get an Payment//////////////////////////////////////////////////

    get_payment: (req, res) => {
        console.log(req.body)
        if (!req.body.sendFrom || !req.body.amount || !req.body.secret || !req.body.destination || !req.body.tag) {
            return res.send({"responseCode" : 400,"responseMessage" : "Parameters missing."});
        }
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "sign",
            "params": [{
                 "secret" : req.body.secret,
                 "tag":req.body.tag, 
                  "tx_json" : 
                        {
                            "TransactionType":"Payment",
                            "Account":req.body.sendFrom,
                            "Amount":req.body.amount,
                            "Destination":req.body.destination
                        }
              }  ]
            
                    }

        var options = {
            url: 'https://s.altnet.rippletest.net:51234/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            //console.log(error, data);
           // if (!error && response.statusCode == 200) {
                // console.log(data);
                //res.send(JSON.parse(data));
            
      
            //}
              var jsonData = JSON.parse(response.body);
               console.log("hhjkjlk;k",jsonData)
            
        var command1 = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "submit",
            "params": [
                    {
                        "tx_blob" : jsonData.result.tx_blob  
                    }                
            

            ]}
            console.log("4544455665",command1)

        var options1 = {
            url: 'https://s.altnet.rippletest.net:51234/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command1)
        };

        request(options1, function (error, response, data) {
            console.log(error, data);
            if (!error && response.statusCode == 200) {
                console.log(data);
                var data = JSON.parse(data)
               
                res.send({"responseCode":200,"Result":data.result.tx_json});
            }
        });
    });
    },



    /////////////////////////////////////////////Get an Address//////////////////////////////////////////////////

    get_address: (req, res) => {
        console.log(req.body)
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "wallet_propose",
            "params": {
                
            }
        }

        var options = {
            url: 'https://s.altnet.rippletest.net:51234/json_rpc',
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
                res.send({"responseCode":200,"Result":JSON.parse(data)});
            }
        });

    },

    /////////////////////////////////////////////Get recieve by Account//////////////////////////////////////////////////

    get_deposits: (req, res) => {
        console.log(req.body)
        if (!req.body.tag || !req.body.account) {
            return res.send({"responseCode" : 400,"responseMessage" : "Parameters missing."});
        }
        var command = {
            "jsonrpc": "2.0",
            "id": "0",
            "method": "account_tx",
                    "params": [
                        {
                            "account": req.body.account,
                            "tag":req.body.tag
                            // "binary": false,
                            // "forward": false,
                            // "ledger_index_max": -1,
                            // "ledger_index_min": -1,
                            // "limit": 2
                        }
                    ]
                
            
        }

        var options = {
            url: 'https://s.altnet.rippletest.net:51234/json_rpc',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: JSON.stringify(command)
        };

        request(options, function (error, response, data) {
            //console.log(error, data);
            if (!error && response.statusCode == 200) {
                //console.log(data);
                var deposits = [];
                var jsonData = JSON.parse(response.body);

                
                for(var i =0; i<jsonData.result.transactions.length;i++){
                 console.log("-========iiiii====",jsonData.result.transactions[i].tx)
                    deposits.push({
                      Deposits : jsonData.result.transactions[i].tx
                  })
                }
                res.send({"responseCode":200,"result":deposits});
            }
        });

    },


    
}