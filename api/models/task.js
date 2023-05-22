const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: false},
    description: {type: String, required: true},
    comments: [{type: String, required: false}],
    creationDate: {type:Date, default: Date.now },
})
const tasks = mongoose.model("Task", TaskSchema)

module.exports = tasks