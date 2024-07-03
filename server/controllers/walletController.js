// server/controllers/walletController.js
const Wallet = require('../models/Wallet');
const User = require('../models/User');

const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.user.id });
        res.json(wallet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const sendMoney = async (req, res) => {
    const { amount, recipientId } = req.body;
    try {
        const senderWallet = await Wallet.findOne({ userId: req.user.id });
        const recipientWallet = await Wallet.findOne({ userId: recipientId });

        if (senderWallet.balance < amount) {
            return res.status(400).json({ msg: 'Insufficient balance' });
        }

        senderWallet.balance -= amount;
        recipientWallet.balance += amount * 0.95; // Deduct 5% fee

        await senderWallet.save();
        await recipientWallet.save();

        res.json({ msg: 'Transaction successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const receiveMoney = async (req, res) => {
    const { amount } = req.body;
    try {
        const wallet = await Wallet.findOne({ userId: req.user.id });
        wallet.balance += amount;

        await wallet.save();
        res.json({ msg: 'Amount credited' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getWallet, sendMoney, receiveMoney };
