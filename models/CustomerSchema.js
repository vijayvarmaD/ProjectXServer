var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CustomerSchema = new Schema({
    userRole: String, 
    name: String,
    password: String,
    address: String,
    phone: Number,
    city: String,
    createdOn: Date,
    onlineStatus: Boolean
});

module.exports = mongoose.model('Customer', CustomerSchema);