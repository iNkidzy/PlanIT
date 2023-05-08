const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// const ObjectId = require('mongoose').Types.ObjectId;
// var BundleRef = mongoose.model('Bundle', Bundle);

const SpaceFunSchema = new Schema({
    name: String,
    project: [{type: Schema.Types.ObjectId, ref: 'Project'}]
})

const SpaceFun = mongoose.model("SpaceFun", SpaceFunSchema)

//test data
 SpaceFun.create({
    name: "Space1",
    project: ['6458db96e8bd7ee58f9d7569'] // project MongoId
 })

module.exports = SpaceFun