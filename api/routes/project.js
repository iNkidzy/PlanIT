const router = require('express').Router();

// const Project = require('../models/project')

const {
    createProject,
    getAllProjects,
    getSpecificProject,
    updateProject,
    deleteProject } = require('../controllers/projectController');

router.get('/', getAllProjects )


router.get('/:id', getSpecificProject)


router.post('/create', createProject)


router.put('/:id', updateProject)

router.delete('/:id', deleteProject)





module.exports = router