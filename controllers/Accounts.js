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
    
}