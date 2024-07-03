// server/routes/wallet.js
const express = require('express');
const router = express.Router();
const { getWallet, sendMoney, receiveMoney } = require('../controllers/walletController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getWallet);
router.post('/send', authMiddleware, sendMoney);
router.post('/receive', authMiddleware, receiveMoney);

module.exports = router;
