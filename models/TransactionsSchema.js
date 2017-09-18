var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TransactionsSchema = new Schema({
    source: { type: ObjectId, ref: 'Wallet' }, 
    destination: { type: ObjectId, ref: 'Wallet' },
    value: Number,
    state: String,
    lastModified: Date
});

module.exports = mongoose.model('Transactions', TransactionsSchema);