const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const OrderData = require('../models/OrderDataSchema');
const ProductData = require('../models/ProductDataSchema');
const Transactions = require('../models/TransactionSchema');

module.exports = {
    orderDataFromId: async (req, res, next) => {
        try {
            // Store request body values
            const { oId } = req.value.body;
            const vendor = req.user._id;

            // Response body values
            let resData;

            // Find OrderData from db
            let orderData = await OrderData.findById(oId);
            if(!orderData) {
                return res.status(403).json({ error: 'The order is you requested is not found.' });
            }

            // Attach product details
            orderData.products.forEach(element => {
                const orderInfo = await ProductData.findById(element.productId, { name: 1, veg: 1 });
                element.name = orderInfo.name;
                element.veg = orderInfo.veg;
            });

            // Attach order value 
            const { value } = await Transactions.findById(orderData.transactionId, { value: 1 });
            if(!value) {
                return res.status(403).json({ error: 'Unable to find order value' });
            }
            orderData.orderAmount = value;

            // Attach Delivery Person details
            const dpDetails = await DeliveryPerson.findById(orderData.deliveryPerson, { phone: 1, name: 1 });
            if(!dpDetails) {
                return res.status(403).json({ error: 'Unable to find deliveryPerson details' });
            }
            orderData.deliveryPerson = dpDetails;

            res.status(200).json({ orderData });
        } catch (error) {
            next(error);
        }
    }
}