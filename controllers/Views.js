// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const ProductData = require('../models/ProductDataSchema');
const OrderData = require('../models/OrderDataSchema');

module.exports = {
    CustomerVOVendors: async (req, res, next) => {
        try {
            const vendorsList = await Vendor.find({}, { _id: 1, name: 1, address: 1, city: 1 });       
            if(!vendorsList) {
                return res.status(403).json({ error: 'No Vendors found!' });
            }
            res.status(200).json(vendorsList);
        } catch(error) {
            next(error);            
        }   
    },
}