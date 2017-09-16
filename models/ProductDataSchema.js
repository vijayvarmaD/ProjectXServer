var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ProductDataSchema = new Schema({
    name: String,
    cuisine: String,
    ingredients: [{ type: String }],
    veg: Boolean,
    unitPrice: Number,
    availability: Boolean,
    createdOn: Date, 
    vendor: { type: ObjectId, ref: 'Vendor' }
});

module.exports = mongoose.model('ProductData', ProductDataSchema);