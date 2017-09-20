// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const ProductData = require('../models/ProductDataSchema');
const OrderData = require('../models/OrderDataSchema');
const Wallet = require('../models/WalletSchema');

module.exports = {
    createWalletForUser: async (reqCopy) => {
        try {
            const { phone, userRole } = reqCopy;
            var foundUser = {};
            if(userRole == "CUSTOMER") {
                foundUser = await Customer.findOne({ phone }, { _id: 1, userRole: 1 });
            } else if(userRole == "VENDOR") {
                foundUser = await Vendor.findOne({ phone }, { _id: 1, userRole: 1 });                
            } else if(userRole == "DELIVERY") {
                foundUser = await DeliveryPerson.findOne({ phone }, { _id: 1, userRole: 1 });                       
            }
            if(!foundUser) { 
               // Log: Wallet creation failed as the account with the "phone" provided was not found.               
            }

            // Create new wallet for the user
            const newWallet = new Wallet({
                userId: foundUser._id,
                userRole: foundUser.userRole,
                balance: 1000,
                pendingTransactions: [],
                latestTransaction: null,
                latestTransaction: Date.now()
            });
            await newWallet.save();

            // Log: Wallet creation as successful
        } catch (error) {
            // console.log(error);
            // Log: error in wallet creation
        }
    },

    customerDetails: async (req, res, next) => {
        try {
            const { cId } = req.params;
            const walletDetails = await Wallet.findOne({ userId: cId, userRole: "CUSTOMER" } , { _id: 0, balance: 1, transactionHistory: 1 });
            if(!walletDetails) {
                return res.status(403).json({ error: 'The Customer you requested for is not found' });
            }
            res.status(200).json(walletDetails);
        } catch (error) {
            next(error);
        }
    },

    vendorDetails: async (req, res, next) => {
        try {
            const { vId } = req.params;
            const walletDetails = await Wallet.findOne({ userId: vId, userRole: "VENDOR" } , { _id: 0, balance: 1, transactionHistory: 1 });
            if(!walletDetails) {
                return res.status(403).json({ error: 'The Vendor you requested for is not found' });
            }
            res.status(200).json(walletDetails);
        } catch (error) {
            next(error);
        }
    },

    deliveryPersonDetails: async (req, res, next) => {
        try {
            const { dId } = req.params;
            const walletDetails = await Wallet.findOne({ userId: dId, userRole: "DELIVERY" } , { _id: 0, balance: 1, transactionHistory: 1 });
            if(!walletDetails) {
                return res.status(403).json({ error: 'The Delivery Person you requested for is not found' });
            }
            res.status(200).json(walletDetails);
        } catch (error) {
            next(error);
        }
    },

    sufficientFundsCheck: async (customer, totalAmt) => {
        try {
            const { balance, _id } = await Wallet.findOne({ userId: customer, userRole: "CUSTOMER" }, { balance: 1 });
            if(balance >= totalAmt) {
                return _id;
            } else {
                return _id;
            }
        } catch (error) {
            next(error);
        }
    }
}