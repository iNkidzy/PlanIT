const task = require('../models/task')
const projectsSchema = require('../models/project')
const mongoose = require('mongoose');

const createTask = async(req,res) => {
    data = req.body;
    try {
        const newTask = await task.create(data)

          //convert to string
          const projectId = new mongoose.Types.ObjectId(data.projectId);
          // find spaceFun
          const project = await projectsSchema.findOne(projectId)

          project.task.push(newTask._id)

          project.save()

        res.status(200).send(newTask)
    } catch(err) {
        res.status(500).send({message: err.message})
    }  
}

const getAllTasks = async (req,res) => {
    try { 
        const getAllTasks = await task.find()
        res.status(200).send(getAllTasks)
    } catch(error){
        res.status(500).send({message: err.message}) 
    }
}

const getSpecificTask = async (req,res) => {
    try {
        const findOneTask = await task.findById(req.params.id)
        res.status(200).send(findOneTask)
   } catch(err) {
        res.status(500).send({message: err.message}) 
    }
}

const updateTask = async (req,res) => {
    const id = req.params.id
    const body = req.body
    try {
        const updateTask = await task.findByIdAndUpdate(id, body)
        if(!updateTask){
            res.status(404).send({message:"Cannot update Task with id:" + id + ".Try Again!"})
        } else {
            res.send({ message: "Task successfully updated!"})
        }
    } catch(err) {
        res.status(500).send({message: "Error updating Task with id:" + id})
    }
}

const deleteTask = async (req,res) => {
    const id = req.params.id
    try {
        const deleteTask = await task.findByIdAndDelete(id)
        if(!deleteTask) {
            res.status(404).send({message: "Error: Can't Delete Task with id:" + id })
        } else {
            res.status(200).send({ message: "Task successfully deleted!"})
        }
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = {createTask, getAllTasks, getSpecificTask, updateTask,deleteTask}