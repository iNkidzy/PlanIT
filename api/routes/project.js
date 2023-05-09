const { Router } = require('express')
const { project } = require('../controllers/projectController')
const Project = require('../models/project')

const router = Router()

router.get('/', async (req, res) => {
    await project.getAllProjects(req, res)
})

router.get('/:id', async (req, res) => {
    await project.getOneProject(req, res)
})

router.post('/', async (req, res) => {
    await Project.createProject(req.body)
})

router.put('/:id', async (req, res) => {
    await project.updateProject(req, req)
})



router.delete('/:id', async (req, res) => {
    await project.deleteProject(req, res)
})


// router.get('/', async (req, res) => {
//     try {
//         const projects = await Project.find()
//         if (!projects) throw new Error('No Projects found')
//         res.status(200).json(projects)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


// router.get('/:id', async (req, res) => {
//     const{ id } = req.body.params
//     try {
//         const project = await Project.findOne(id)
//         if (!project) throw new Error('No Project found')
//         res.status(200).json(project)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })




// router.post('/', async (req, res) => {
//     const newProject = new Project(req.body)
//     try {
//         const project = await newProject.save()
//         if (!project) throw new Error('Something went wrong saving the project')
//         res.status(200).json(project)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.put('/:id', async (req, res) => {
//     const{ id } = req.body.params
//     try {
//         const project = await Project.findByIdAndUpdate(id)
//         if (!project) throw new Error('No Project found')
//         res.status(200).json(project)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params.id
//     try {
//         const removedProject = await Project.findByIdAndDelete(id)
//         if (!removedProject) throw Error('Something went wrong ')
//         res.status(200).json(removedProject)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })



module.exports = router