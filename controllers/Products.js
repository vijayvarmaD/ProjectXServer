// Models
const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const ProductData = require('../models/ProductDataSchema');
const OrderData = require('../models/OrderDataSchema');

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
    },

    CustomerProductsList: async (req, res, next) => {
        try {
            const vendorsList = await Vendor.find({}, { _id: 1, name: 1 })
            const productsByVendor = [];
            for(var x of vendorsList) {
                var vendor = x._id;
                const vendorProductsMenu = await ProductData.find({ vendor, availability: true });
                productsByVendor.push({ vendorName: x.name, vendorProductsMenu });
            }
            if(!productsByVendor) {
                return res.status(403).json({ error: 'No Products found!' });
            }
            res.status(200).json(productsByVendor);
        } catch(error) {
            next(error);
        }
    },

    // CheckProductAvailability: async (req, res, next) => {
    //     try {
    //         const { pId } = req.value.body;
    //         const availabilityStatus = [];
    //         for(var x of pId) {
    //             const status = await ProductData.find({ _id: x }, { availability: 1 });
    //             availabilityStatus.push(status);
    //         }
    //         res.status(200).json(availabilityStatus);
    //     } catch(error) {
    //         next(error);
    //     }
    // },

    AddToCart: async (req, res, next) => {
        try {
            const { pId } = req.value.body;
            const { availability } = await ProductData.findById(pId, { _id: 0, availability: 1 });
            if(!availability) {
                return res.status(403).json({ error: 'Sorry!The Product is not available!' });
            }
            res.status(200).json({ availability });
        } catch (error) {
            next(error);
        }
    }
}    