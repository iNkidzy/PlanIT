const router = require('express').Router();
const { tokenVerification } = require("../validation");

// const SpaceFun = require('../models/spaceFun')
const { 
    createSpaceFun,
    getAllSpaceFuns,
    getSpecificSpaceFun,
    updateSpaceFun,
    deleteSpaceFun } = require('../controllers/spaceFunController');


router.get('/', tokenVerification, getAllSpaceFuns )

router.get('/:id', getSpecificSpaceFun)

router.post('/create', createSpaceFun)

router.put('/:id', updateSpaceFun)

router.delete('/:id', deleteSpaceFun)


module.exports = router