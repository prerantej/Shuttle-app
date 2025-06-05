const express = require('express');
const { getWalletBalance, rechargeWallet } = require('../controllers/walletController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/balance', auth, getWalletBalance);            // Any user
router.post('/recharge', auth, rechargeWallet);           // Admin only

module.exports = router;
