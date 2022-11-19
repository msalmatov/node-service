import { Joi, validate } from 'express-validation';

let extJoi = Joi.extend(require('joi-phone-number'));
extJoi = extJoi.extend(require('joi-password').joiPasswordExtendCore);

export const loginValidation = {
    body: extJoi.object({
        id: extJoi.alternatives().try(
            extJoi.string().email(),
            extJoi.string().phoneNumber()
        ).required(),
        password: extJoi
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
    })
}

export function validateLogin() {
    return validate(loginValidation, { keyByField: true });
}