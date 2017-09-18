const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/index');

// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const Otp = require('../models/OtpSchema');

const WalletsController = require('../controllers/Wallets');


// Token Signature
signToken = (user) => {
    return JWT.sign({
        iss: 'AUTH',
        sub: user,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    customerSignup: async (req, res, next) => {
        // Store request body values
        const { name, password, address, phone, city } = req.value.body;
        const userRole = "CUSTOMER";
        const onlineStatus = false;

        // req copy for wallet creation
        const reqCopy = { phone, userRole };
            
        // Find if a user already exists
        const foundCustomer = await Customer.findOne({ phone });
        if(foundCustomer) {
            return res.status(403).json({ error: 'An account is already registered with the provided phone number' });
        }

        // Create new user and save in db accordingly
        const newCustomer = new Customer({ userRole, name, password, address, phone, city, onlineStatus });
        newCustomer.createdOn = Date.now();
        await newCustomer.save();

        // Response
        res.status(201).json({ success: true });
        
        // Wallet Creation call
        WalletsController.createWalletForUser(reqCopy);
    },

    vendorSignup: async (req, res, next) => {
        // Store request body values
        const { userRole, name, password, address, phone, city } = req.value.body;
        const onlineStatus = false;

        // req copy for wallet creation
        const reqCopy = { phone, userRole };

        // Find if a user already exists
        const foundVendor = await Vendor.findOne({ phone });
        if(foundVendor) {
            return res.status(403).json({ error: 'An account is already registered with the provided phone number' });
        }

        // Create new user and save in db accordingly
        const newVendor = new Vendor({ userRole, name, password, address, phone, city });
        newVendor.createdOn = Date.now();
        await newVendor.save();
        res.status(201).json({ success: true });

        // Wallet Creation call
        WalletsController.createWalletForUser(reqCopy);
    },

    deliverypersonSignup: async (req, res, next) => {
        // Store request body values
        const { userRole, name, password, address, phone, city, vehicleno } = req.value.body;
        const onlineStatus = false;

        // req copy for wallet creation
        const reqCopy = { phone, userRole };
        
        // Find if a user already exists
        const foundDeliveryPerson = await DeliveryPerson.findOne({ phone });
        if(foundDeliveryPerson) {
            return res.status(403).json({ error: 'An account is already registered with the provided phone number' });
        }

        // Create new user and save in db accordingly
        const newDeliveryPerson = new DeliveryPerson({ userRole, name, password, address, phone, city, vehicleno });
        newDeliveryPerson.createdOn = Date.now();
        await newDeliveryPerson.save();
        res.status(201).json({ success: true });

        // Wallet Creation call
        WalletsController.createWalletForUser(reqCopy);
    },  

    customerSignin: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    vendorSignin: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    deliverypersonSignin: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    details: async (req, res, next) => {
        // const cust = await Customer.findOne({  });
        res.json(req.user);
    },

    otpSignupAuth: async (req, res, next) => {
        const { userRole, name, phone, otp } = req.value.body;
        const otpAuthenticated = await Otp.findOneAndRemove({ userRole, name, otp, phone });  
        if(!otpAuthenticated) {
            return res.status(403).json({ error: 'Authentication Failed! Please contact helpdesk.' });
        }
        next();
    }
}