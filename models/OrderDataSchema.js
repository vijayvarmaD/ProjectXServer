var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderDataSchema = new Schema({
    datetime: Date, 
    products: [{
        _id: false,
        "productId": { type: ObjectId, ref: 'ProductData' },
        "quantity": { type: Number } 
    }],
    totalAmt: Number,
    transactionId: { type: ObjectId, ref: 'OrderData' },
    customer: { type: ObjectId, ref: 'Customer' },
    vendor: { type: ObjectId, ref: 'Vendor' },
    deliveryPerson: { type: ObjectId, ref: 'DeliveryPerson' },
    orderStatus: String
});

module.exports = mongoose.model('OrderData', OrderDataSchema);