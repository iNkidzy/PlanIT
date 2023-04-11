const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TasksSchema = Schema({
    author: String,
    description: String,
    creationDate: {type:Date, default: Date.now },

})

module.exports = mongoose.model('task', TasksSchema)