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
            // Get request body values
            const { name, address, phone, city } = req.value.body;
            
            // Find if a user already exists

        // Vendor Signup        
        } else if(req.value.body.role == "VENDOR") {


        // DeliveryPerson Signup
        } else if(req.value.body.role == "DELIVERY") {

        }
        
    }
}