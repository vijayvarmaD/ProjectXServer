var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserRoleSchema = new Schema({
    role: String,
    name: String,
    phone: Number,
    onlineStatus: Boolean
});

module.exports = mongoose.model('UserRole', UserRoleSchema);