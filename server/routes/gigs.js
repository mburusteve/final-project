// server/routes/gigs.js
const express = require('express');
const router = express.Router();
const { addGig, getGigs } = require('../controllers/gigController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, addGig);
router.get('/', getGigs);

module.exports = router;
