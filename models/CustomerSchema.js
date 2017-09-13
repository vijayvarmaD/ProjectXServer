var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CustomerSchema = new Schema({
    userRole: { type: ObjectId, ref: 'UserRole' }, 
    name: String,
    address: String,
    phone: Number,
    city: String,
    createdOn: Date
});

module.exports = mongoose.model('Customer', CustomerSchema);