var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DeliveryPersonSchema = new Schema({
    userRole: String,
    name: String,
    password: String, 
    address: String,
    phone: Number,
    city: String,
    createdOn: Date,
    vehicleno: String,
    onlineStatus: Boolean
});

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);