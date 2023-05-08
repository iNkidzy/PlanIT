const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    assignedTo: String
})
const Project = mongoose.model('Project', ProjectSchema);

 //Create a new bundle
//  Project.create({
//     name: "Project1",
//     assignedTo: 'Someone',
//  })

module.exports = Project