const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateRegister } = require('../validation');


router.post('/register', async (req, res) => {

    //userinput validation
    const { error } = validateRegister(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    //duplicate email check
    const duplicateEmail = await User.findOne({ email: req.body.email });

    if (duplicateEmail) return res.status(400).json({ message: "Email already exists" });

    //hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
const userObj = new User({
    username: req.body.username,
    email: req.body.email,
    hashedPassword
});

try {
    const userSaved = await userObj.save();
    res.json({ error: null, data: userSaved._id }); 
} catch (error) {
res.status(400).json({error});
}

});

router.post('/login', async (req, res) => {

     //userinput validation
     const { error } = validateLogin(req.body);

     if (error) {
        return res.status(400).json({ message: error.details[0].message });
     }
     //valid login data finds a user
     const user = await User.findOne({ email: req.body.email });

     //wrong email error or there is no user with this email
     if (!user) return res.status(400).json({ message: "Wrong email" });

     //existing email/user, check password
     const passwordIsValid = await bcrypt.compare(req.body.password, user.hashedPassword);

     if (!passwordIsValid) return res.status(400).json({ message: "Wrong password" });


     //token generation authentication with username and id
     
    //return res.status(200).json({message: "Login route "});

});

module.exports = router;