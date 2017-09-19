var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TransactionSchema = new Schema({
    source: { type: ObjectId, ref: 'Wallet' }, 
    destination: { type: ObjectId, ref: 'Wallet' },
    value: Number,
    state: String,
    lastModified: Date
});

module.exports = mongoose.model('Transactions', TransactionSchema);