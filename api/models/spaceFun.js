const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// const ObjectId = require('mongoose').Types.ObjectId;
// var BundleRef = mongoose.model('Bundle', Bundle);

const SpaceFunSchema = new Schema({
    name: String,
    bundle: [{type: Schema.Types.ObjectId, ref: 'Bundle'}]
})

const SpaceFun = mongoose.model("SpaceFun", SpaceFunSchema)

//
 SpaceFun.create({
    name: "Wrap122",
    bundle: ['643aa26410b6dbf248554532'] // bundelmongoid
 })

module.exports = SpaceFun