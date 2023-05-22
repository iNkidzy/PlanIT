const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true},
    task: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    users: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { 
            type: String,
            enum: ["LEADER", "USER"],
            default: "USER" }
    }],
    createdAt: { type: Date, default: Date.now },
})
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project