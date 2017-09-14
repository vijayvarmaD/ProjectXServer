const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/index');

// Models
const UserRole = require('../models/UserRoleSchema');
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');

// Token Signature
signToken = (user) => {
    return JWT.sign({
        iss: 'VJ',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        // Customer Signup
        if(req.value.body.role == null) {
            // Store request body values
            const { name, address, phone, city } = req.value.body;
            const role = "CUSTOMER";
            const onlineStatus = false;
            
            // Find if a user already exists
            const foundCustomer = await Customer.findOne({ phone });
            if(foundCustomer) {
                return res.status(403).json({ error: 'An account is already registered with the provided phone number' });
            }

            // Create new user and save in db accordingly
            const newUserRole = new UserRole({ role, name, phone, onlineStatus });
            await newUserRole.save();
            // const foundUserRole = await UserRole.findOne({ phone });
            // if(foundUserRole) {
            //     const newCustomer = new Customer({ name, address, phone, city });
            //     newCustomer.userRole = foundUserRole._id;
            //     newCustomer.createdOn = Date.now();
            //     await newCustomer.save();
            //     res.status(201).json({ success: true });                
            // } else {
            //     res.status(403).json({ error: 'Something went wrong!' });
            // } 
            res.status(201).json({ success: true })  
        }
        // Vendor Signup                
        else if(req.value.body.role == "VENDOR") {
            // Store request body values
            const { role, name, address, phone, city } = req.value.body;
            const onlineStatus = false;

            // Find if a user already exists
            const foundVendor = await Vendor.findOne({ phone });
            if(foundVendor) {
                return res.status(403).json({ error: 'An account is already registered with the provided phone number' });
            }

            // Create new user and save in db accordingly
            const newUserRole = new UserRole({ role, name, phone, onlineStatus });
            await newUserRole.save();
            const foundUserRole = await UserRole.findOne({ phone });
            if(foundUserRole) {
                const newVendor = new Vendor({ role, name, address, phone, city });
                newVendor.userRole = foundUserRole._id;
                newVendor.createdOn = Date.now();
                await newVendor.save();
                res.status(201).json({ success: true });
            } else {
                res.status(403).json({ error: 'Something went wrong!' });
            }   
        }
        // DeliveryPerson Signup        
        else if(req.value.body.role == "DELIVERY") {
            // Store request body values
            const { role, name, address, phone, city, vehicleno } = req.value.body;
            const onlineStatus = false;

            // Find if a user already exists
            const foundDeliveryPerson = await DeliveryPerson.findOne({ phone });
            if(foundDeliveryPerson) {
                return res.status(403).json({ error: 'An account is already registered with the provided phone number' });
            }

            // Create new user and save in db accordingly
            const newUserRole = new UserRole({ role, name, phone, onlineStatus });
            await newUserRole.save();
            const foundUserRole = await UserRole.findOne({ phone });
            if(foundUserRole) {
                const newDeliveryPerson = new DeliveryPerson({ role, name, address, phone, city, vehicleno });
                newDeliveryPerson.userRole = foundUserRole._id;
                newDeliveryPerson.createdOn = Date.now();
                await newDeliveryPerson.save();
                res.status(201).json({ success: true });
            } else {
                res.status(403).json({ error: 'Something went wrong!' });
            }
        }   
    }
}