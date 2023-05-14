const router = require('express').Router();
const { tokenVerification } = require('../validation');
const {
    createUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser } = require('../controllers/userController');
const { signupUser, loginUser } = require('../controllers/authController');

//For User
router.post('/signup', signupUser)

router.post('/login', loginUser)

//For Admin 

router.post('/create', tokenVerification, createUser)

router.get('/', tokenVerification, getAllUsers)

router.get('/:id', tokenVerification, getSpecificUser)

router.put('/:id', tokenVerification, updateUser)

router.delete('/:id', tokenVerification, deleteUser)

module.exports = router;