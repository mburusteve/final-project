const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Gig', GigSchema);
