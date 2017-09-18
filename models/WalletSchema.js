var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var WalletSchema = new Schema({
    userId: { type: ObjectId },
    userRole: String,
    balance: Number,
    pendingTransactions: [{ type: ObjectId, ref: 'ProductData' }],
    createdOn: Date,
    transactionHistory: [{
        "orderId": { type: ObjectId, ref: 'OrderData' },
        "value": Number,
        "tType": String
    }],
});

module.exports = mongoose.model('Wallet', WalletSchema);