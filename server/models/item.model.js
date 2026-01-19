const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },

    image: [String],

    category: {
        type: String,
        required: true,
    },
    sizes: [String],
    colors: [String],
    inStock: Boolean,
});

const Items = mongoose.model('Item', itemSchema);

module.exports = Items;
