const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const SpaceFunSchema = new Schema({
    name: String,
    project: [{type: Schema.Types.ObjectId, ref: 'Project'}]
})

const spaceFun = mongoose.model("SpaceFun", SpaceFunSchema)

module.exports = spaceFun