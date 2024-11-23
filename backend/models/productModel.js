const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',
        required: true 
    },
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number
}, {
    timestamps: true
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;

/*
*/