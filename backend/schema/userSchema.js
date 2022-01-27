const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

module.exports = mongoose.model("users", userModel);