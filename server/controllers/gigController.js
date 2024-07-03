// server/controllers/gigController.js
const Gig = require('../models/Gig');

const addGig = async (req, res) => {
    const { title, description, price, category } = req.body;
    try {
        const newGig = new Gig({
            title,
            description,
            price,
            category,
            freelancerId: req.user.id
        });

        const gig = await newGig.save();
        res.json(gig);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getGigs = async (req, res) => {
    try {
        const gigs = await Gig.find().populate('freelancerId', ['username', 'email']);
        res.json(gigs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { addGig, getGigs };
