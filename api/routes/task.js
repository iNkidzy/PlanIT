const router = require('express').Router();
const { 
    createTask,
    getAllTasks,
    getSpecificTask,
    updateTask,
    deleteTask } = require('../controllers/taskController');

router.post('/create', createTask)   

router.get('/', getAllTasks )

router. get('/:id', getSpecificTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

module.exports = router