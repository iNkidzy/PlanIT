const mongoose = require("mongoose")
const Bundle = require("./bundle")
const Schema = mongoose.Schema;

const SpaceFunSchema = new Schema({
    name: String,
    bundle: Bundle
})

const SpaceFun = mongoose.model("SpaceFun", SpaceFunSchema)
// Create a new house
SpaceFun.create({
    name: "Wrap6",
    bundle: {name: "bundleled"}
})

module.exports = SpaceFun