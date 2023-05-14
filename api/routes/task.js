const router = require('express').Router();
const { tokenVerification } = require("../validation");

const { 
    createTask,
    getAllTasks,
    getSpecificTask,
    updateTask,
    deleteTask } = require('../controllers/taskController');

router.post('/create', tokenVerification, createTask)   

router.get('/', tokenVerification ,getAllTasks )

router. get('/:id', tokenVerification, getSpecificTask)

router.put('/:id', tokenVerification, updateTask)

router.delete('/:id', tokenVerification, deleteTask)

module.exports = router