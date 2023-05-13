const project = require('../models/project')



    const createProject = async (req, res) => {
        data = req.body;

        project.insertMany(data)
            .then(data => { res.send(data) })
            .catch(err => { res.status(500).send({ message: err.message }) })
            
    }

    const getAllProjects = async (req, res) => {
        project.find()
            .then(data => { res.send(data) })
            .catch(err => {
                res.status(500).send({ message: err.message })
            })

    }

    const getSpecificProject = async (req, res) => {
        project.findById(req.params.id)
            .then(data => { res.send(data) })
            .catch(err => { res.status(500).send({ message: err.message }) })

    }

    const updateProject = async (req, res) => {
        const id = req.params.id;
        const body = req.body;

        project.findByIdAndUpdate(id, body)
            .then(data => {
                !data ? res.status(404).send({ message: "Cannot update project with id" + id + "Try Again" }) : res.send({ message: "Project successfully updated!" })

            })
            .catch(err => {
                res.status(500).send({ message: "Error updating project with id:" + id })
            })

    }

    const deleteProject = async (req, res) => {
        const id = req.params.id;

        project.findByIdAndDelete(id)
            .then(data => {
                res.send({ message: "Project successfully deleted!" })
            })
            .catch(err => {
                res.status(500).send({ message: "Error deleting project with id:" + id })
            })

    }

    module.exports = { createProject, updateProject, getAllProjects, getSpecificProject, deleteProject }
