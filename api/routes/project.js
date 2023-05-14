const router = require('express').Router();
const { tokenVerification } = require("../validation");

// const Project = require('../models/project')

const {
    createProject,
    getAllProjects,
    getSpecificProject,
    updateProject,
    deleteProject } = require('../controllers/projectController');

router.get('/', tokenVerification, getAllProjects)


router.get('/:id', tokenVerification, getSpecificProject)


router.post('/create', tokenVerification, createProject)


router.put('/:id', tokenVerification, updateProject)

router.delete('/:id', tokenVerification, deleteProject)





module.exports = router