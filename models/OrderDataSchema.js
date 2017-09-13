var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderDataSchema = new Schema({
    datetime: Date, 
    customer: { type: ObjectId, ref: 'Customer' },
    vendor: { type: ObjectId, ref: 'Vendor' },
    deliveryPerson: { type: ObjectId, ref: 'DeliveryPerson' }
});

module.exports = mongoose.model('OrderData', OrderDataSchema);