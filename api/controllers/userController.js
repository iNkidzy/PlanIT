const user = require('../models/user')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    const newUser = new user({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password
    })

    try {
        const userSaved = await newUser.save()
        res.status(200).send({ message: "Successfully created new user with id:" + userSaved._id })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const getAllUsers = await user.find()
        res.status(200).send(getAllUsers)
    } catch (error) {
        res.status(500).send({ message: err.message })
    }
}

const getSpecificUser = async (req, res) => {
    try {
        const findOneUser = await user.findById(req.params.id).populate('spacefun')
        res.status(200).send(findOneUser)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id
    const body = req.body
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    } else {
        req.body.password = undefined
    }
    try {
        const updateUser = await user.findByIdAndUpdate(id, body)
        if (!updateUser) {
            res.status(404).send({
                message: "Cannot update user with id:" + id + ".Try Again!"
            })
        } else {
            res.send({ message: "User successfully updated!" })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await user.findByIdAndDelete(req.params.id)
        if (!deleteUser) {
            res.status(404).send({ message: "Error: Can't Delete User with id:" + id })
        } else {
            res.status(200).send({ message: "User successfully deleted!" })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

module.exports = { createUser, getAllUsers, getSpecificUser, updateUser, deleteUser }