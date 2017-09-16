var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OtpSchema = new Schema({
    userRole: String, 
    name: String,
    phone: Number,
    otp: Number
});

module.exports = mongoose.model('Otp', OtpSchema);