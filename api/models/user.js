const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, min: 6, max: 26},
    password: {type: String, required: true, min: 6, max: 255},
    email: {type: String, required: true, min: 6, max: 255},
    //spacefuns??
    date: {type: Date, default: Date.now}

    //  could also be as projectschema - username: String, password: String, email: String...
})

module.exports =mongoose.model('User', UserSchema);
