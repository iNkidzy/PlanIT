// find a project within a spacefun

const Project = require('../models/project')
const SpaceFun = require('../models/spaceFun')

const project = async (req, res) => {

    try {

        const projectFound = await Project.findOne({ _id: '6458db96e8bd7ee58f9d7569' }) //finds specific project
        console.log(projectFound, 'Project found')

        const project = await Project.find({}).populate('task')
        if (!project) throw new Error('No Fun Project')

        res.json(project)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProject = async (req, res) => {
    try {
        const newProject = new Project({
            name: req.body.name,
            assignedTo: req.body.assignedTo,
            task: req.body.task,
            createdAt: req.body.createdAt

        })
        const savedProject = await newProject.save()
        res.json(savedProject)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const getOneProject = async (req, res) => { }
const { id } = req.params
try {
    const getProject = await Project.findById(id)
} catch (error) {
    res.status(500).json({ message: error.message })
}

const updateProject = async (req, res) => {
    try {
        const updateProject = await Project.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (!updateProject) throw new error('Project not found')
        res.json(updateProject)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        if (!projects) throw new error('No projects found')
        res.json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProject = async (req, res) => { }
try {
    const deleteProject = await Project.findByIdAndDelete({ _id: req.params.id })
    if (!deleteProject) throw new error('Project not found')
    res.json(deleteProject, 'Project deleted')
} catch (error) {
    res.status(500).json({ message: error.message })

}

module.exports = { project, createProject, updateProject, getAllProjects, deleteProject, getOneProject }