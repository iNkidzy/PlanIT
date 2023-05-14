const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { signupValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const { 
    createUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser } = require('../controllers/userController');


router.post('/signup', async (req, res) => {
    //userinput validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    //duplicate username check // shouldn't there be a check for duplicate email as well?
    const usernameCheck = await User.findOne({ username: req.body.username });
    if (usernameCheck) return res.status(400).json({ message: "Username already exists" });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //create new user
    const userObj = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password
    });

    try {
        const userSaved = await userObj.save();
        res.json({message:"Successfully created new user with id:" + userSaved._id })
    } catch (error) {
        res.status(400).json({ error });
    }

});

router.post('/login', async (req, res) => {

    //userinput validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    //valid login data finds a user
    const user = await User.findOne({ username: req.body.username });

    //wrong username error or there is no user with this username
    if (!user) return res.status(400).json({ message: "Error: Wrong username or User doesn't exists" });

    // check password
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) return res.status(400).json({ message: "Error: Incorrect password" });


    //token generation authentication with username and id
    const token = jwt.sign(
        {
            username: user.username,
            id: user._id
        },
        //SECRET TOKEN
        process.env.TOKEN_SECRET, {
        //EXP TIME
        expiresIn: process.env.JWT_EXPIRES_IN
    },



    )
    //attach to header
    res.header("auth-token", token).json({
        error: null,
        data: { token }
    })
});

//For Admin 

router.post('/create', createUser)

router.get('/', getAllUsers)

router.get('/:id', getSpecificUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router;