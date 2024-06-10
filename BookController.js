const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

exports.getAllBooks = async (req, res) => {
    const books = await Book.find().populate('authors');
    res.json(books);
};

exports.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id).populate('authors');
    if (book) {
        res.json(book);
    } else {
        res.sendStatus(404);
    }
};

exports.createBook = async (req, res) => {
    const { bookCode, title, description, publishedYear, price, authors, externalId } = req.body;
    const book = new Book({ bookCode, title, description, publishedYear, price, authors, externalId });
    await book.save();
    res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
        res.json(book);
    } else {
        res.sendStatus(404);
    }
};

exports.deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.sendStatus(404);
    }
};
