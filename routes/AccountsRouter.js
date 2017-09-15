const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../configuration/passport');

const AccountsController = require('../controllers/Accounts');

const { schemas } = require('../validation/ValidationSchemas');
const { validateBody } = require('../validation/Validator');

router.route('/Customer/Signup')
    .post([
        validateBody(schemas.CustomerSignupSchema),
        AccountsController.customerSignup
    ]);

router.route('/Vendor/Signup')
    .post([
        validateBody(schemas.VendorSignupSchema),
        // Admin authentication required

        AccountsController.vendorSignup
    ]);

router.route('/DeliveryPerson/Signup')
    .post([
        validateBody(schemas.DeliveryPersonSignupSchema),
        // Admin authentication required

        AccountsController.deliverypersonSignup
    ]);

router.route('/Customer/Signin')
    .post([
        validateBody(schemas.SigninSchema),
        passport.authenticate('customer-local', { session: false }),
        AccountsController.customerSignin
    ]);

router.route('/Vendor/Signin')
    .post([
        validateBody(schemas.SigninSchema),
        passport.authenticate('vendor-local', { session: false }),
        AccountsController.vendorSignin
    ]);

router.route('/DeliveryPerson/Signin')
    .post([
        validateBody(schemas.SigninSchema),
        passport.authenticate('deliveryperson-local', { session: false }),
        AccountsController.deliverypersonSignin
    ]);

router.route('/ForgotPassword')
    .post();

module.exports = router;
