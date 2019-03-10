import Joi from 'joi';

export default {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                //Perhaps we should specify with [result.error.name is missing] if this exists to specify the actual missing parameter
                return res.status(422).json({ status: 422, data: result.error });
            }
            if (!req.value) { req.value = {} }
            req.value['body'] = result.value;
            next();
        }
    }, 
    schemas: {
        authSchema: Joi.object().keys({
            subject: Joi.string().required(),
            message: Joi.string().required(),
            parentMessageId: Joi.number().required(),
            receiverEmail: Joi.string().email().required()
        })
    }
}
