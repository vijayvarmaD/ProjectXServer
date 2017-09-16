const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./index.js');
const { ExtractJwt } = require('passport-jwt');

const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');

// JSON WEB TOKENS Strategy
passport.use(
    'customer-jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: JWT_SECRET
    }, async (payload, done) => {
        try {
            const customer = await Customer.findById(payload.sub);
            if(!customer) {
                return done(null, false);
            }
            done(null, customer);
        } catch(error) {
            done(error, false);
        }
    })
);

passport.use(    
    'vendor-jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: JWT_SECRET
    }, async (payload, done) => {
        try {
            const vendor = await Vendor.findById(payload.sub, { "_id": 1 });
            if(!vendor) {
                return done(null, false);
            }
            done(null, vendor);
        } catch(error) {
            done(error, false);
        }
    })
);

passport.use(    
    'deliveryperson-jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: JWT_SECRET
    }, async (payload, done) => {
        try {
            const deliveryperson = await DeliveryPerson.findById(payload.sub);
            if(!deliveryperson) {
                return done(null, false);
            }
            done(null, deliveryperson);
        } catch(error) {
            done(error, false);
        }
    })
);


// LOCAL Strategy
passport.use(
    'customer-local', new LocalStrategy({
        usernameField: 'phone'
    }, async (phone, password, done) => {
        try {
            const customer = await Customer.findOne({ phone });
            if(!customer) {
                return done(null, false);
            } 
            const isMatch = await customer.isValidPassword(password);
            if(!isMatch) {
                return done(null, false);
            }
            done(null, customer._id)
        } catch(error) {
            done(error, false);
        }
    })
);

passport.use(
    'vendor-local', new LocalStrategy({
        usernameField: 'phone'
    }, async (phone, password, done) => {
        try {
            const vendor = await Vendor.findOne({ phone });
            if(!vendor) {
                return done(null, false);
            } 
            const isMatch = await vendor.isValidPassword(password);
            if(!isMatch) {
                return done(null, false);
            }
            done(null, vendor._id)
        } catch(error) {
            done(error, false);
        }
    })
);

passport.use(
    'deliveryperson-local', new LocalStrategy({
        usernameField: 'phone'        
    }, async (phone, password, done) => {
        try {
            const deliveryperson = await DeliveryPerson.findOne({ phone });
            if(!deliveryperson) {
                return done(null, false);
            } 
            const isMatch = await deliveryperson.isValidPassword(password);
            if(!isMatch) {
                return done(null, false);
            }
            done(null, deliveryperson._id)
        } catch(error) {
            done(error, false);
        }
    })
);
