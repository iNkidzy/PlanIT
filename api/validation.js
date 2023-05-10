const Joi = require('joi');

//validation for register
const validateRegister = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required()

        }
    );
//validate data according to schema rules
    return schema.validate(data);
}   
module.exports = {validateRegister};