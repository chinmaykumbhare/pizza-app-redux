const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    order: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("orders", orderSchema);