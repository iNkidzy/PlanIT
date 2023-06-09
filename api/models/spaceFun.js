const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const SpaceFunSchema = new Schema({
    name: { type: String, required: true },
    project: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const spaceFun = mongoose.model("SpaceFun", SpaceFunSchema)

module.exports = spaceFun