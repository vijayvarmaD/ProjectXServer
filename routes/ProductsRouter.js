const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

// Controller
const ProductsController = require('../controllers/Products');

// Validation
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

router.route('/Vendor/DeleteProduct').post([
    validateBody(schemas.DeleteProductSchema),
    passport.authenticate('vendor-jwt', { session: false }),
    ProductsController.VendorDeleteProduct
]);

router.route('/Vendor/EditProduct').post([
    validateBody(schemas.EditProductSchema),
    passport.authenticate('vendor-jwt', { session: false }),
    ProductsController.VendorEditProduct
]);

router.route('/Vendor/:pId/Availability').post([
    validateBody(schemas.ProductAvailabilitySchema),
    validateParam(schemas.idSchema, 'pId'),
    passport.authenticate('vendor-jwt', { session: false }),
    ProductsController.ProductAvailability
]);

router.route('/Customer/View').get([
    passport.authenticate('customer-jwt', { session: false }),
    ProductsController.CustomerProductsList
]);

// router.route('/Customer/checkAvail').post([
//     validateBody(schemas.idArraySchema),
//     passport.authenticate('customer-jwt', { session: false }),
//     ProductsController.CheckProductAvailability
// ]);

router.route('/Cart/Add').post([
    validateBody(schemas.cartSchema),
    passport.authenticate('customer-jwt', { session: false }),
    ProductsController.CheckAvail    
]);

// router.route('/Vendor/UploadImg').post([
//     ProductsController.UploadImg
// ]);

module.exports = router;
