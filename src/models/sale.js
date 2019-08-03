const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    product_id: Number,
    user_id: Number,
    sold_qnt: Number,
    billed_value: Number,
    date: {
        type: Date,
        default: Date.now(),
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Sale', SaleSchema);