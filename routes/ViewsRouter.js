const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

// Controller
const ViewsController = require('../controllers/Views');

// Validation
const { schemas } = require('../validation/ValidationSchemas');
const { validateBody, validateParam } = require('../validation/Validator');

router.route('/Customer/RestaurantList').get([
    passport.authenticate('customer-jwt', { session: false }),
    ViewsController.CustomerVOVendors  
]);

module.exports = router;