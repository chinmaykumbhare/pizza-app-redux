const mongoose = require('mongoose');

const pizzaList = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("pizzaList", pizzaList);