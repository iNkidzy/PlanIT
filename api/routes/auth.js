const router = require('express').Router();
const user = require('../models/user');
const {validateRegister} = require('../validation');


router.post('/register', async (req, res) => {

//userinput validation
const {error} = validateRegister(req.body);

if(error) return res.status(400).json({message: error.details[0].message}); 

//duplicate email check
const duplicateEmail = await user.findOne({email: req.body.email}); 

if(duplicateEmail) return res.status(400).json({message: "Email already exists"});

//hash password

//create new user

//return res.status(200).json({message: "Register route "});


});

router.post('/login', async (req, res) => {

    //return res.status(200).json({message: "Login route "});

});

module.exports = router;