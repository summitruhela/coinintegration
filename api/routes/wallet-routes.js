const walletRoutes = require('express').Router()
const wallet = require('../controllers/wallet-handler')
console.log("iota wallet")

walletRoutes.get('/get_server_info', wallet.get_server_info);
walletRoutes.get('/generate_new_addr', wallet.generate_new_addr);
walletRoutes.get('/get_addr_info', wallet.get_addr_info);
walletRoutes.post('/deposit_history', wallet.deposit_history);
walletRoutes.post('/payment_method', wallet.payment_method);
walletRoutes.post('/getTransactionsToApprove', wallet.getTransactionsToApprove)
walletRoutes.post('/getBalances', wallet.getBalances)
walletRoutes.post('/attachToMesh', wallet.attachToMesh);

module.exports = walletRoutes;


