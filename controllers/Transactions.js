// Models
const Transaction = require('../models/TransactionSchema');
const Wallet = require('../models/WalletSchema');

module.exports = {
    C2L: async (totalAmt, customerWalletId, ledger) => {
        // STEP:1 --> Get wallet details and value
        const source = customerWalletId;
        const destination = ledger;
        const value = totalAmt;

        // STEP:2 --> Initialize Transfer record in Transaction Collection
        const lastModified = Date.now();
        const state = "initial";
        const newTransaction = new Transaction({ source, destination, value, state, lastModified });
        await newTransaction.save(); 

        // STEP:3 --> Retrieve the transaction and start procedure
        const t = await Transaction.findOne({ source, state });
        if(!t) {
            // throw error that T not found
        }

        // STEP:4 --> Update Transaction state to pending
        await Transaction.update(
            { _id: t._id, state: "initial" },
            {
                $set: { state: "pending" },
                $currentDate: { lastModified: true }
            }
        );

        // STEP:5 --> Apply the transaction to both wallets
        // customer transaction
        await Wallet.update(
            { _id: t.source, pendingTransactions: { $ne: t._id } },
            { 
                $inc: { balance: -t.value },
                $push: { pendingTransactions: t._id }
            }
        );

        // ledger transaction
        await Wallet.update(
            { _id: t.destination, pendingTransactions: { $ne: t._id } },
            { 
                $inc: { balance: t.value },
                $push: { pendingTransactions: t._id }
            }
        );

        // STEP:6 --> Update transaction state to applied
        await Transaction.update(
            { _id: t._id, state: "pending" },
            {
              $set: { state: "applied" },
              $currentDate: { lastModified: true }
            }
        );

        // STEP:7 --> Update both wallet's list of pending transactions
        // customer
        await Wallet.update(
            { _id: t.source, pendingTransactions: t._id },
            { $pull: { pendingTransactions: t._id } }
        );

        // ledger
        await Wallet.update(
            { _id: t.destination, pendingTransactions: t._id },
            { $pull: { pendingTransactions: t._id } }
        );

        // STEP:8 --> Update transaction state to done
        await Transaction.update(
            { _id: t._id, state: "applied" },
            {
              $set: { state: "done" },
              $currentDate: { lastModified: true }
            }
        );
        const TData = await Transaction.findById(t._id);
        return TData;
        

        // if any errors check pendingTransactions array reading in db operations
        // test transactions
    }
}