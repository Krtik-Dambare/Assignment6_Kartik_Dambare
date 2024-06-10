const Author = require('../models/Author');

exports.getAllAuthors = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

exports.getAuthorById = async (req, res) => {
    const author = await Author.findById(req.params.id).populate('books');
    if (author) {
        res.json(author);
    } else {
        res.sendStatus(404);
    }
};

exports.createAuthor = async (req, res) => {
    const { name, bio, birthdate, isSystemUser } = req.body;
    const author = new Author({ name, bio, birthdate, isSystemUser });
    await author.save();
    res.status(201).json(author);
};

exports.updateAuthor = async (req, res) => {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (author) {
        res.json(author);
    } else {
        res.sendStatus(404);
    }
};

exports.deleteAuthor = async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (author) {
        res.json(author);
    } else {
        res.sendStatus(404);
    }
};
