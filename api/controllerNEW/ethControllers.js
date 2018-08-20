
const request = require('request');
module.exports = {

    /////////////////////////////////////////////Create an wallet//////////////////////////////////////////////////

    createAccount: (req, res) => {
        //console.log(req.body)
        var command = {
            
                "jsonrpc": "2.0",
                "method": "eth_accounts", 
                "params": [], 
                "id": "1"       
            
        }

        var options = {
            //url: 'https://mainnet.infura.io/',
            url: 'https://ropsten.infura.io/1Tk7euPfEWmz18slvgBJ', 
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
            "method": "eth_getBalance", 
            "params": ["0x6dd80e0bcc1ca62141b03e1b4978e569ce02d914", "latest"] , 
            "id": "1"       
        
    }

    var options = {
        url: 'https://ropsten.infura.io/1Tk7euPfEWmz18slvgBJ',
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
                "method": "sendfrom", 
                "params": [
                    "0xecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9",
        "AbP3FU3YcqBrWh72nc9deyQB99eazG9XUg",
        "1",
        "0",
        "ARkJ8QcVdYL68WRvN3wj3TSvXX8CgmC73Z"
                ], 
                "id": "1"       
            
        }

        var options = {
            url: 'https://ropsten.infura.io/1Tk7euPfEWmz18slvgBJ',
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

    /////////////////////////////////////////////Get incoming transfers//////////////////////////////////////////////////

    getRawTransaction: (req, res) => {
        console.log(req.body)
        var command = {
            
                "jsonrpc": "2.0",
                "method": "getrawtransaction",
                "params": ["0x1b461128730b23083a257d88dff9c0fe6c46d68990b97807e8c31edc52b21ef6", 1],
                "id": 1
              
            
        }

        var options = {
            url: 'https://ropsten.infura.io/1Tk7euPfEWmz18slvgBJ',
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




}