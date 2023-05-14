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

router.get('/:id', tokenVerification, getSpecificSpaceFun)

router.post('/create', tokenVerification, createSpaceFun)

router.put('/:id',tokenVerification, updateSpaceFun)

router.delete('/:id', tokenVerification, deleteSpaceFun)


module.exports = router