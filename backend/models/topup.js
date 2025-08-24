const mongoose = require('mongoose');

const topUpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending' // The default state
    },
    dateRequested: {
        type: Date,
        default: Date.now
    }
});

exports.TopUp = mongoose.model('TopUp', topUpSchema);