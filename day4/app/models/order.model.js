const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product: String,
    quantity: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);