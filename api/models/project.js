const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const projectUserRolesEnum = [
    'LEADER',
    'USER'
]
const ProjectSchema = new Schema({
    name: { type: String, required: true },
    task: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now },
    AssignedTo: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { enum: projectUserRolesEnum, default: projectUserRolesEnum } 
    }],
})
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project