// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const OrderData = require('../models/OrderDataSchema');
const Wallet = require('../models/WalletSchema');
const ProductData = require('../models/ProductDataSchema');
// const io = require('../app');

// Controllers
const WalletsController = require('../controllers/Wallets');
const TransactionsController = require('../controllers/Transactions');

// Services
const sock = require('../services/sock');

module.exports = {
    orderSubmit: async (req, res, next) => {
        // STEP:1 --> Get Order Details
        const { cart } = req.value.body;
        const vendor = req.value.body.vendor;
        const customer = req.user._id;
        const orderData = new OrderData({ products: cart, customer, vendor: vendor.toString() });
        
        // STEP:2 --> Calculate Total Cost
        var totalAmt = 0;
        for(var x of cart) {
            const { unitPrice } = await ProductData.findOne({ _id: x.productId }, { unitPrice: 1, _id: 0 });
            totalAmt += ( unitPrice * x.quantity );
        }  
        if(totalAmt <= 0) {
            // send back response -ve
            console.log('negtive response to be sent - stpe 2 OMS');
        }

        // STEP:3 --> Check with Wallet Controller if there are sufficient funds in the user's wallet
        customerWalletId = await WalletsController.sufficientFundsCheck(customer, totalAmt);
        if(customerWalletId === 'insufficient') {
            // send response -ve
            console.log('insufficient');
        } 

        // STEP:4 --> Proceed to Transaction Controller , depending on T success proceed
        // ledger wallet id 
        var ledger = "5a3e0f53a67e6a8e59759e2b";        
        const TData = await TransactionsController.C2L(totalAmt, customerWalletId, ledger);
        if(TData) {
            // send response to client +ve and spin up the loaders            
            res.status(200).json(TData);
        } else {
            // Payment failed
            res.status(403).json({ error: "Payment failed" });
        }
        
        // Process continues after response - Collect Socket IDs for dispatching Notifications
        let customerSocketId = null;
        let vendorSocketId = null;
        users.forEach(element => {
            if (element.userId.toString() == customer.toString()) {
                customerSocketId = element.socketId;
            } else if (element.userId.toString() === vendor.toString()) {
                vendorSocketId = element.socketId;
            }
        });


        // STEP:5 --> Store the TID in "OrderData" 
        orderData.transactionId = TData._id;

        // STEP:6 --> Proceed to Delivery Person Assignment & store in OrderData
        // Setup a logic to choose a delivery person from a pool and then provide DP ID
        orderData.deliveryPerson = "59bc1305b420c308d4d95ea9";

        // STEP:7 --> Send Notification to Vendor
        if (vendorSocketId != null) {
            console.log('here');
            io.sockets.to(vendorSocketId).emit('new-order-alert', { oId: orderData._id });
        }

        // STEP:8 --> Send Notification to DeliveryPerson

        // STEP:9 --> Enter data into "OrderTrackingSchema" and then EXIT!!!!!
        orderData.orderStatus = "Placed";
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
