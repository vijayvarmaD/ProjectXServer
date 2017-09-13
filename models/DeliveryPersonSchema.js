var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DeliveryPersonSchema = new Schema({
    userRole: { type: ObjectId, ref: 'UserRole' },
    name: String, 
    address: String,
    phone: Number,
    city: String,
    createdOn: Date,
    vehicleno: String
});

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);