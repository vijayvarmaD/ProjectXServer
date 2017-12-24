const Joi = require('joi');

// products array validation for orderSchema
const productsSchema = {
    productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    quantity: Joi.number().required()
};

module.exports = {
    schemas: {
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
            otp: Joi.number().required(),
            address: Joi.string().required(),
            phone: Joi.number().required(),
            city: Joi.string().required()
        }),

        DeliveryPersonSignupSchema: Joi.object().keys({
            userRole: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            otp: Joi.number().required(),            
            address: Joi.string().required(),
            phone: Joi.number().required(),
            city: Joi.string().required(),
            vehicleNo: Joi.string().required()
        }),

        SigninSchema: Joi.object().keys({
            phone: Joi.number().required(),
            password: Joi.string().required()
        }),

        AddProductSchema: Joi.object().keys({
            name: Joi.string().required(),
            cuisine: Joi.string().required(),
            ingredients: [  Joi.array() ],
            veg: Joi.boolean().required(),
            unitPrice: Joi.number().required()
        }),

        ProductAvailabilitySchema: Joi.object().keys({
            availability: Joi.boolean().required()
        }),

        idSchema:  Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        // idArraySchema: Joi.object().keys({
        //     pId: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())     
        // }),

        cartSchema: Joi.object().keys({
            pId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        DeleteProductSchema: Joi.object().keys({
            pId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        EditProductSchema: Joi.object().keys({
            pId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name: Joi.string().required(),
            cuisine: Joi.string().required(),
            ingredients: [  Joi.array() ],
            veg: Joi.boolean().required(),
            unitPrice: Joi.number().required(),
            vendor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        orderSchema: Joi.object().keys({
            cart: Joi.array().min(1).items(Joi.object(productsSchema).required()),
            totalAmount: Joi.number().required(),
            vendor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
        
    }
}