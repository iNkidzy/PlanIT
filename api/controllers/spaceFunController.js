const spaceFun = require('../models/spaceFun')
const mongoose = require('mongoose');

const createSpaceFun = async (req, res) => {
    try {
        data = req.body;
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const newSpaceFun = await spaceFun.create({ ...data, user: userId })
        res.status(200).send(newSpaceFun)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const getAllSpaceFuns = async (req, res) => {
    try {
        const getAllSpaceFuns = await spaceFun.find({ user: req.user.id })
        res.status(200).send(getAllSpaceFuns)
    } catch (err) {
        res.status(500).send({ messager: err.message })
    }
}

const getSpecificSpaceFun = async (req, res) => {
    try {
        const findOneSpaceFun = await spaceFun.findById(req.params.id).populate('project')
        res.status(200).send(findOneSpaceFun)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const updateSpaceFun = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const updateSpaceFun = await spaceFun.findByIdAndUpdate(id, body)
        if (!updateSpaceFun) {
            res.status(404).send({ message: "Cannot update SpaceFun with id:" + id + ".Try Again!" })
        } else {
            res.status(200).send({ message: "SpaceFun successfully updated!" })
        }
    } catch (err) {
        res.status(500).send({ message: "Error updating SpaceFun with id:" + id })
    }
}

const deleteSpaceFun = async (req, res) => {
    const id = req.params.id
    try {
        const deleteSpaceFun = await spaceFun.findByIdAndDelete(id)
        if (!deleteSpaceFun) {
            res.status(404).send({ message: "Error: Id not found" })
        } else {
            res.status(200).send({ message: "SpaceFun successfully deleted!" })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

module.exports = { createSpaceFun, getAllSpaceFuns, getSpecificSpaceFun, updateSpaceFun, deleteSpaceFun }