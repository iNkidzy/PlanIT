const user = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation } = require("../validation");

const signupUser = async (req, res) => {

    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    //duplicate username check
    const usernameCheck = await user.findOne({ username: req.body.username });
    if (usernameCheck) return res.status(400).json({ message: "Username already exists" });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //create new user
    const userObj = new user({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password
    });

    try {
        const userSaved = await userObj.save();
        res.json({ message: "Successfully created new user with id:" + userSaved._id })
    } catch (error) {
        res.status(400).json({ error });
    }
}

const loginUser = async (req, res) => {
    //userinput validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    //valid login data finds a user
    const User = await user.findOne({ username: req.body.username }).select('+password');

    //wrong username error or there is no user with this username
    if (!User) return res.status(400).json({ message: "Error: Wrong username or User doesn't exists" });

    // check password
    const passwordIsValid = await bcrypt.compare(req.body.password, User.password);
    if (!passwordIsValid) return res.status(400).json({ message: "Error: Incorrect password" });

    //token generation authentication with username and id
    const token = jwt.sign(
        {
            username: User.username,
            id: User._id,
            role: User.role
        },
        //SECRET TOKEN
        process.env.TOKEN_SECRET, {
        //EXP TIME
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    )
    // //attach to header
    res.json({
        error: null,
        data: { token }
    })
}
module.exports = { signupUser, loginUser }