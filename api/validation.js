const Joi = require('joi');

//validation for register
const signupValidation = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().min(4).max(15).required(),
            name: Joi.string().min(4).max(50),
            password: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255),
            role: Joi.string()

        }
    );
    //validate data according to schema rules
    return schema.validate(data);
}

//validation for login - checks for the username and for the password
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().min(4).max(15).required(),
            password: Joi.string().min(6).max(255).required()
        }
    );
    return schema.validate(data);
}

//verifying the token

const tokenVerification = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }

}

module.exports = { signupValidation, loginValidation, tokenVerification }