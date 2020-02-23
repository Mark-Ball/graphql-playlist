const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    }
});

const AuthorModel = mongoose.model('author', authorSchema);

module.exports = AuthorModel;