const Review = require('../models/reviewModel');

exports.getReviewsByBookId = async (req, res) => {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
};

exports.addReview = async (req, res) => {
    const { content } = req.body;
    const review = new Review({ userId: req.user.id, bookId: req.params.bookId, content });
    await review.save();
    res.status(201).json(review);
};

exports.deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review && (review.userId.toString() === req.user.id || req.user.isAdmin)) {
        await review.remove();
        res.json(review);
    } else {
        res.sendStatus(403);
    }
};
