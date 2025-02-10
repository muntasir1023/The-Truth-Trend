const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3 // Added validation for minimum length
    },
    description: {
        type: String,
        required: true,
        minlength: 10 // Added validation for minimum length
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Added timestamps option

module.exports = mongoose.model('Item', itemSchema);
