const task = require('../models/task')

const createTask = async(req,res) => {
    data = req.body
    
    await task.insertMany(data)
    .then(data => { res.send(data)})
    .catch(err => {res.status(500).send({message: err.message}) 
    })
}
const getAllTasks = async (req,res) => {
    try { 
        const Task = await task.find()
        res.status(200).send(Task)
    } catch(error){
        res.status(500).send({message: err.message}) 
    }
}
const getSpecificTask = async (req,res) => {
    await task.findById(req.params.id)
    .then(data => { res.send(data)})
    .catch(err => {res.status(500).send({message: err.message}) 
    })
}
const updateTask = async (req,res) => {
    const id = req.params.id
    const body = req.body

    await task.findByIdAndUpdate(id, body)
    .then(data => { !data ? res.status(404).send({
        message: "Cannot update Task with id:" + id + ".Try Again!"
    }) : res.send({ message: "Task successfully updated!"})
    })
    .catch(err => {res.status(500).send({message: "Error updating Task with id:" + id}) 
    })
}
const deleteTask = async (req,res) => {
    const id = req.params.id
    await task.findByIdAndDelete(id)
    .then(data => {res.send({ message: "Task successfully deleted!"})
    })
    .catch(err => {res.status(500).send({message: "Error: Can't Delete Task with id:" + id }) 
    })
}

module.exports = {createTask, getAllTasks, getSpecificTask, updateTask,deleteTask}