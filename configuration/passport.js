const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./index.js');
const { ExtractJwt } = require('passport-jwt');

const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');

// JSON WEB TOKENS Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const customer = await Customer.findById(payload.sub);
        const vendor = await Vendor.findById(payload.sub);
        const deliveryperson = await DeliveryPerson.findById(payload.sub);
        if(!customer && !vendor && !deliveryperson) {
            return done(null, false);
        }
        done(null, customer);
    } catch(error) {
        done(error, false);
    }
}));

// LOCAL Strategy
passport.use(new LocalStrategy({
    usernameField: 'phone'
}, async (phone, password, done) => {
    try {
        const customer = await Customer.findOne({ phone });
        const vendor = await Vendor.findOne({ phone });
        const deliveryperson = await DeliveryPerson.findOne({ phone });
        const userRole = null;
        const userObject = null;
        if(!customer && !vendor && !deliveryperson) {
            return done(null, false);
        } else {
            if(!customer && !vendor) {
                userRole = "DELIVERY"; 
            }
            else if(!customer && !deliveryperson) {
                userRole = "VENDOR"; 
            }
            else if(!deliveryperson && !vendor) {
                userRole = "CUSTOMER"; 
            }
        }
        const isMatch = await userRole.isValidPassword(password);
        if(!isMatch) {
            return done(null, false);
        }
        done(null, )
    } catch(error) {
        
    }
}));