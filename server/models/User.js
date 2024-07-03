const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, enum: ['client', 'freelancer'], required: true },
    profilePicture: { type: String, default: '' },
    profession: { type: String, default: '' },
    reviews: [{ type: Number, default: [] }],
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }
});

module.exports = mongoose.model('User', UserSchema);

