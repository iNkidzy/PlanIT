const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Bundle = new Schema({
    name: String,
    assignedTo: String,
})


module.exports = Bundle