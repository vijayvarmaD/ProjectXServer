const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/index');

// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const ProductData = require('../models/ProductDataSchema');

module.exports = {
    VendorProductsList: async (req, res, next) => {
        try {
            const vendor = req.user._id;
            const vendorProducts = await ProductData.find({ vendor });
            if(!vendorProducts) {
                return res.status(403).json({ error: 'No Products found!' });
            }
            res.status(200).json(vendorProducts);
        } catch(error) {
            next(error);            
        }   
    },

    VendorAddProduct: async (req, res, next) => {
        try {            
            // Store request body values
            const { name, cuisine, ingredients, veg, unitPrice } = req.value.body;
            const vendor = req.user._id;

            // Find if the vendor's menu already has the product
            const foundProduct = await ProductData.findOne({ vendor, name, cuisine })
            if(foundProduct) {
                return res.status(403).json({ error: 'The Product already exists in your products list' });            
            }

            // Create new product and save in db
            const newProduct = new ProductData({ name, cuisine, ingredients, veg, unitPrice, vendor });
            newProduct.createdOn = Date.now();
            newProduct.availability = true;
            await newProduct.save();

            res.status(201).json({ success: true });
        } catch(error) {
            next(error);            
        } 
    },

    ProductAvailability: async (req, res, next) => {
        try {
            const { pId } = req.value.params;
            const { availability } = req.value.body;
            const updateAvailability = await ProductData.findByIdAndUpdate(pId, { availability });
            res.status(200).json({ success: true });
        } catch(error) {
            next(error);
        }
    }
}    