const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookCode: String,
    title: String,
    description: String,
    publishedYear: Number,
    price: Number,
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    externalId: String,
});

module.exports = mongoose.model('Book', bookSchema);
