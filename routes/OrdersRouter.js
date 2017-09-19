const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

const OMS = require('../services/OMS');

const { schemas } = require('../validation/ValidationSchemas');
const { validateBody, validateParam } = require('../validation/Validator');

router.route('/Submit').post([
    validateBody(schemas.orderSchema),
    //passport.authenticate('customer-jwt', { session: false }),
    OMS.orderSubmit
]);

module.exports = router;
