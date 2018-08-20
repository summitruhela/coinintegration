import HttpClient from "@tronprotocol/wallet-api";
 
const Client = new  HttpClient({
    "host":"http://45.118.157.89:50051/"
});
 


exports.demo = function(req, res) {
   

    let latestBlock =  Client.getLatestBlock();
console.log("$$$$$$$$$$$$$$$$",latestBlock)
};