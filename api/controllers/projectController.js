const project = require('../models/project')

    const createProject = async (req, res) => {
        try {
            data = req.body;
    
            const newProject = await project.create(data)
            res.status(200).send(newProject)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    const getAllProjects = async (req, res) => {
        try {
            const getAllProjects = await project.find()
            res.status(200).send(getAllProjects)
        }catch(err) {
            res.status(500).send({ message: err.message })
        }
    }

    const getSpecificProject = async (req, res) => {
        try{
            const findOneProject = await project.findById(req.params.id)
            res.status(200).send(findOneProject)
        } catch(err) {
            res.status(500).send({ message: err.message })
    }
}

    const updateProject = async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try{
            const updateProject = project.findByIdAndUpdate(id, body)
            if(!updateProject) {
                res.status(404).send({ message: "Cannot update project with id:" + id + ".Try Again!" })
            } else {
                res.status(200).send({ message: "Project successfully updated!" })
            }
        } catch (err){
            res.status(500).send({ message: "Error updating project with id:" + id })
        }
    }

    const deleteProject = async (req, res) => {
        const id = req.params.id;

        try {
            const deleteProject = await project.findByIdAndDelete(id)
            if(!deleteProject) {
            res.status(404).send({ message: "Error: Id not found" })
        } else {
            res.status(200).send({message: "Project successfully deleted!"})}
        } catch(err) {
            res.status(500).send({ message: err.message })
        }
    }

    module.exports = { createProject, updateProject, getAllProjects, getSpecificProject, deleteProject }
