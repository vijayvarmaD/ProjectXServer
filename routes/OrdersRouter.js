const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

const OMS = require('../services/OMS');
const OrdersController = require('../controllers/Orders');

const { schemas } = require('../validation/ValidationSchemas');
const { validateBody, validateParam } = require('../validation/Validator');

router.route('/Submit').post([
    validateBody(schemas.orderSchema),
    passport.authenticate('customer-jwt', { session: false }),
    OMS.orderSubmit
]);

router.route('/OrderData/id').post([
    validateBody(schemas.orderIdSchema),
    passport.authenticate('vendor-jwt', { session: false }),
    OrdersController.orderDataFromId
]);

module.exports = router;
