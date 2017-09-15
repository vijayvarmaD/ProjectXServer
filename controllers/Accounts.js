const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/index');

// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');

// Token Signature
signToken = (entity) => {
    return JWT.sign({
        iss: 'AUTH',
        sub: entity.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        // Customer Signup
        if(req.value.body.role == null) {
            // Store request body values
            const { name, password, address, phone, city } = req.value.body;
            const userRole = "CUSTOMER";
            const onlineStatus = false;
            
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
        }
        // Vendor Signup                
        else if(req.value.body.role == "VENDOR") {
            // Store request body values
            const { userRole, name, password, address, phone, city } = req.value.body;
            const onlineStatus = false;

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
        }
        // DeliveryPerson Signup        
        else if(req.value.body.role == "DELIVERY") {
            // Store request body values
            const { userRole, name, password, address, phone, city, vehicleno } = req.value.body;
            const onlineStatus = false;

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
        }   
    }
}