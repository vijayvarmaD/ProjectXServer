const Joi = require('joi');

module.exports = {
    schemas: {
        authSchema: Joi.object().keys({
            
        }),

        CustomerSignupSchema: Joi.object().keys({
            name: Joi.string().required(),
            password: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.number().required(),
            city: Joi.string().required()
        }),

        VendorSignupSchema: Joi.object().keys({
            userRole: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.number().required(),
            city: Joi.string().required()
        }),

        DeliveryPersonSignupSchema: Joi.object().keys({
            userRole: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.number().required(),
            city: Joi.string().required(),
            vehicleNo: Joi.string().required()
        }),
    }
}