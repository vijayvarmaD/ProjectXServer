var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DeliveryPersonSchema = new Schema({
    userRole: { type: ObjectId, ref: 'UserRole' }, 
    address: String,
    phone: Number,
    city: String,
    createdOn: Date,
    orderData: { type: ObjectId, ref: 'OrderData' },
    vehicleno: String
});

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);