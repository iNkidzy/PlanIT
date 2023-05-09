const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    assignedTo: { type: String, required: true },
    task: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now }

})
const Project = mongoose.model('Project', ProjectSchema);
//test data
Project.create({
    name: "Project1",
    assignedTo: 'Someone',
    task: ['6458db96e8bd7ee58f9d7569'],// task MongoId - rn random id
    createdAt: Date.now()
})


module.exports = Project