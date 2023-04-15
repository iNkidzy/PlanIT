const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const BundleSchema = new Schema({
    name: String,
    assignedTo: String
})
const Bundle = mongoose.model('Bundle', BundleSchema);

//  //Create a new bundle
//  Bundle.create({
//     name: "Bundle1",
//     assignedTo: 'Nobody',
//  })

module.exports = Bundle