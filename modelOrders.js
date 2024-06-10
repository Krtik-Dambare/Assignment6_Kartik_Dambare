const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    amount: Number,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
