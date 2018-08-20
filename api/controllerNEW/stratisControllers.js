//"seed" == "price table other dignity syrup strong prepare critic similar matter neglect silent"
//name= Manish , password = Manish
//TVNL8qvqDwYVQo9ZQxSopi8NtczdoKo1rm
const request = require('request');


module.exports = {

    /////////////////////////////////////////////Create an wallet//////////////////////////////////////////////////
    wallet: (req, res) => {
        console.log(req.body)
        
        var dataString = {
            "name" : req.body.name,
            "password": req.body.password
        }
        
        var options = {
            url: 'http://localhost:38221/api/Wallet/create',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataString)
        };
        
        function callback(error, response, body) {
            console.log(JSON.parse(body));
           
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body));
                res.send({"responseCode": 200,"Seed":JSON.parse(body)})
            }
            else
            res.send({"responseMessage":"Wallet with name already exists" })
        }
        
        request(options, callback);
        

    },

    /////////////////////////////////////////////Create an Account//////////////////////////////////////////////////
    newAccount: (req, res) => {
        console.log(req.body)
        
        var dataString = 
                        {
                         "walletName" : req.body.walletName,
                         "password" : req.body.password
                        }
        
        var options = {
            url: 'http://localhost:38221/api/Wallet/account',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataString)
        };
        
        function callback(error, response, body) {
            console.log(JSON.parse(body));
           
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body));
                res.send({"responseCode": 200,"AccountName":JSON.parse(body)})
            }
            else
            res.send({"responseMessage":"Internal server Error" })
        }
        
        request(options, callback);
        

    },

    /////////////////////////////////////////////Create an Address of an Account//////////////////////////////////////////////////
    address: (req, res) => {
        console.log(req.body)
        
        var dataString = {
                         "AccountName": req.body.AccountName, 
                         "WalletName": req.body.WalletName
                        };
        
        var options = {
            url: 'http://localhost:38221/api/Wallet/unusedaddress',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataString)
        };
        
        function callback(error, response, body) {
            console.log(error)
           
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body));
                res.send({"responseCode": 200,"Address":JSON.parse(body)})
            }
            else
            res.send({"responseMessage":"Internal server Error" })
        }
        
        request(options, callback);
        

    },




}

