const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

const ProductsController = require('../controllers/Products');

const { schemas } = require('../validation/ValidationSchemas');
const { validateBody, validateParam } = require('../validation/Validator');

router.route('/Vendor/View').get([
    passport.authenticate('vendor-jwt', { session: false }),
    ProductsController.VendorProductsList  
]);

router.route('/Vendor/AddProduct').post([
    validateBody(schemas.AddProductSchema),
    passport.authenticate('vendor-jwt', { session: false }),
    ProductsController.VendorAddProduct
]);

router.route('/Vendor/:pId/Availability').post([
    validateBody(schemas.ProductAvailabilitySchema),
    validateParam(schemas.idSchema, 'pId'),
    passport.authenticate('vendor-jwt', { session: false }),
    ProductsController.ProductAvailability
]);

module.exports = router;
