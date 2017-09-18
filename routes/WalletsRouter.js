const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

const WalletsController = require('../controllers/Wallets');

const { schemas } = require('../validation/ValidationSchemas');
const { validateBody, validateParam } = require('../validation/Validator');

router.route('/Customer/Details/:cId').get([
    validateParam(schemas.idSchema, 'cId'),
    passport.authenticate('customer-jwt', { session: false }),
    WalletsController.customerDetails
]);

router.route('/Vendor/Details/:vId').get([
    validateParam(schemas.idSchema, 'vId'),
    passport.authenticate('vendor-jwt', { session: false }),
    WalletsController.vendorDetails
]);

router.route('/Delivery/Details/:dId').get([
    validateParam(schemas.idSchema, 'dId'),
    passport.authenticate('delivery-jwt', { session: false }),
    WalletsController.deliveryPersonDetails
]);

module.exports = router;
