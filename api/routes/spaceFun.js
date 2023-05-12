const router = require('express').Router();
// const SpaceFun = require('../models/spaceFun')
const { 
    createSpaceFun,
    getAllSpaceFuns,
    getSpecificSpaceFun,
    updateSpaceFun,
    deleteSpaceFun } = require('../controllers/spaceFunController');


router.get('/', getAllSpaceFuns )

router.get('/:id', getSpecificSpaceFun)

router.post('/create', createSpaceFun)

router.put('/:id', updateSpaceFun)

router.delete('/:id', deleteSpaceFun)


module.exports = router