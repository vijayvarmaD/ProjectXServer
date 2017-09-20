// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const OrderData = require('../models/OrderDataSchema');
const Wallet = require('../models/WalletSchema');
const ProductData = require('../models/ProductDataSchema');

// Controllers
const WalletsController = require('../controllers/Wallets');
const TransactionsController = require('../controllers/Transactions');

module.exports = {
    orderSubmit: async (req, res, next) => {
        // STEP:1 --> Get Order Details
        const { products, customer } = req.value.body;
        const orderData = new OrderData({ products, customer });
        
        // STEP:2 --> Calculate Total Cost
        var totalAmt = 0;
        for(var x of products) {
            const { unitPrice } = await ProductData.findOne({ _id: x.productId }, { unitPrice: 1, _id: 0 });
            totalAmt += ( unitPrice * x.quantity );
        }  
        if(totalAmt >= 0) {
            // send back response -ve
        }

        // STEP:3 --> Check with Wallet Controller if there are sufficient funds in the user's wallet
        customerWalletId = await WalletsController.sufficientFundsCheck(customer, totalAmt);
        if(!customerWalletId) {
            // send response -ve
        } 

        // STEP:4 --> Proceed to Transaction Controller , depending on T success proceed
        // ledger wallet id 
        var ledger = "59c225a953b19d6ae200a8ea";        
        const TData = await TransactionsController.C2L(totalAmt, customerWalletId, ledger);
        if(TData) {
            // send response to client +ve and spin up the loaders            
            res.status(200).json(TData);
        } else {
            // Payment failed
            res.status(403).json({ error: "Payment failed" });
        }
        
        // Process continues after response

        // STEP:5 --> Store the TID in "OrderData" temporarily
        orderData.transactionId = TData._id;

        // STEP:6 --> Proceed to Delivery Person Assignment & store in OrderData
        // Setup a logic to choose a delivery person from a pool and then provide DP ID
        orderData.deliveryPerson = "59c254fa6362f93300b270ba";

        // STEP:7 --> Send Notification to Vendor

        // STEP:8 --> Send Notification to DeliveryPerson

        // STEP:9 --> Enter data into "OrderTrackingSchema" and then EXIT!!!!!
        await orderData.save();
    },

    orderSuccess: async () => {
        // STEP:10 --> Confirm Delivery Success from "DeliveryPerson" & "Customer" by checking "OrderTrackingSchema"

        // STEP:11 --> Fetch OrderData from "OrderDataSchema"

        // STEP:12 --> Payment to Vendor

        // STEP:13 --> Payment to DeliveryPerson

        // STEP:14 --> Check with all parties for any discrepencies

        // STEP:15 --> Close Order

    }

         
}


// Transmit necessary updates to client using socket.io throughout the process.
