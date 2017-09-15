var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
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

DeliveryPersonSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch(error) {
        next(error);
    }
});

DeliveryPersonSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);