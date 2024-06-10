const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    birthdate: Date,
    isSystemUser: Boolean,
});

module.exports = mongoose.model('Author', authorSchema);