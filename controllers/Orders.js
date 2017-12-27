const Customer = require('../models/CustomerSchema');
const Vendor = require('../models/VendorSchema');
const DeliveryPerson = require('../models/DeliveryPersonSchema');
const OrderData = require('../models/OrderDataSchema');

module.exports = {
    orderDataFromId: async (req, res, next) => {
        try {
            // Store request body values
            const { oId } = req.value.body;
            const vendor = req.user._id;

            // Find OrderData from db
            const orderData = await OrderData.findById(oId, { transactionId: 0 });
            if(!orderData) {
                return res.status(403).json({ error: 'The order is you requested is not found.' });
            }
            res.status(200).json({ orderData });
        } catch (error) {
            next(error);
        }
    }
}