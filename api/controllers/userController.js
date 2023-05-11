const user = require('../models/user')

// const createUser = async(req,res) => {
//     data = req.body

//     await user.insertMany(data)
//     .then(data => { res.send(data)})
//     .catch(err => {res.status(500).send({message: err.message}) 
//     })
// }
const getAllUsers = async (req,res) => {
    try { 
        const User = await user.find()
        res.status(200).send(User)
    } catch(error){
        res.status(500).send({message: err.message}) 
    }
}
const getSpecificUser = async (req,res) => {
    await user.findById(req.params.id)
    .then(data => { res.send(data)})
    .catch(err => {res.status(500).send({message: err.message}) 
    })
}
const updateUser = async (req,res) => {
    const id = req.params.id
    const body = req.body

    await user.findByIdAndUpdate(id, body)
    .then(data => { !data ? res.status(404).send({
        message: "Cannot update user with id:" + id + ".Try Again!"
    }) : res.send({ message: "User successfully updated!"})
    })
    .catch(err => {res.status(500).send({message: "Error updating User with id:" + id}) 
    })
}
const deleteUser = async (req,res) => {
    const id = req.params.id
    await user.findByIdAndDelete(id)
    .then(data => {res.send({ message: "User successfully deleted!"})
    })
    .catch(err => {res.status(500).send({message: "Error: Can't Delete User with id:" + id }) 
    })
}

module.exports = { getAllUsers, getSpecificUser, updateUser,deleteUser}