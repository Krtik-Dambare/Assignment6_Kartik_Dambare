const Rating = require('../models/ratingModel');

exports.getRatingsByBookId = async (req, res) => {
    const ratings = await Rating.find({ bookId: req.params.bookId });
    res.json(ratings);
};

exports.addRating = async (req, res) => {
    const { rating } = req.body;
    const newRating = new Rating({ userId: req.user.id, bookId: req.params.bookId, rating });
    await newRating.save();
    res.status(201).json(newRating);
};
