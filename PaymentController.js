const Payment = require('../models/paymentModel');

exports.createOrder = async (req, res) => {
    const { bookId, amount } = req.body;
    // Assuming integration with GoCardless API
    const payment = new Payment({ userId: req.user.id, bookId, amount, status: 'Pending' });
    await payment.save();
    res.status(201).json(payment);
};

exports.getOrderById = async (req, res) => {
    const order = await Payment.findById(req.params.id);
    if (order && order.userId.toString() === req.user.id) {
        res.json(order);
    } else {
        res.sendStatus(403);
    }
}