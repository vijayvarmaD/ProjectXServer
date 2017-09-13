const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../configuration/passport');

const AccountsController = require('../controllers/Accounts');

const { schemas } = require('../validation/ValidationSchemas');
const { validateBody } = require('../validation/Validator');

// STATUS: 
router.route('/Signup')
    .post([
        validateBody(schemas.CustomerSignupSchema),
        AccountsController
    ]);

router.route('/Signin')
    .post();

router.route('/ForgotPassword')
    .post();

module.exports = router;
