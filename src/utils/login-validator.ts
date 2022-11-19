import { validate, ValidationError, Joi } from 'express-validation';

const loginValidation = {
    body: Joi.object({

        id: Joi.alternatives().try(
            Joi.string().email(),
            Joi.string().regex(/[0-9]{3,30}/)
        ),


        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
}