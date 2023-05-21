const router = require('express').Router();
const { tokenVerification, requireAdmin } = require('../validation');
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

router.post('/create', tokenVerification, requireAdmin, createUser)

router.get('/', tokenVerification, requireAdmin, getAllUsers)

router.get('/:id', tokenVerification, requireAdmin, getSpecificUser)

router.put('/:id', tokenVerification, requireAdmin, updateUser)

router.delete('/:id', tokenVerification, requireAdmin, deleteUser)

module.exports = router;