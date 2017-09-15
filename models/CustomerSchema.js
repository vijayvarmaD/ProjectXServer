var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
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

// Hashing and salting
CustomerSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch(error) {
        next(error);
    }
});

// Password validation
CustomerSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('Customer', CustomerSchema);