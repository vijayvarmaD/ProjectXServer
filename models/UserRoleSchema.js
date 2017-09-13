var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserRoleSchema = new Schema({
    role: String,
    name: String,
    onlineStatus: Boolean
});

module.exports = mongoose.model('UserRole', UserRoleSchema);