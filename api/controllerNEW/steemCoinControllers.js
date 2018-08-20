'use strict';

const request = require('request');


exports.get_account = function(req, res) {
  console.log(req.body)
  var command = {
      "jsonrpc": "2.0",
      "id": "0",
      "method": "get_accounts",
      "params": [[
         req.params.account
      ]]
  }

  var options = {
      url: 'https://api.steemit.com',
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
          res.send(JSON.parse(data));
          
      }
  });

  
};


exports.account_history = function(req, res) {
  console.log(req.body)
  var command = {
      "jsonrpc": "2.0",
      "id": "0",
      "method": "get_account_history",
      "params": [[
         req.params.account
      ]]
  }

  var options = {
      url: 'https://api.steemit.com',
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
          res.send(JSON.parse(data));
          
      }
  });
}