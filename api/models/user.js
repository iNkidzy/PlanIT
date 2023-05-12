const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const userRolesEnum = [
    'SUPERADMIN',
    'USER',
]
const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, max: 15},
    name: {type: String, required: false, min: 4, max: 50},
    password: {type: String, required: true, min: 6, max: 255},
    email: {type: String, required: true, min: 6, max: 255},
    //role: { type: [String], enum: userRolesEnum, default: ['USER'] },
    role: { type: String, enum: userRolesEnum},
    date: {type: Date, default: Date.now}
})
// TODO: Talk about properties and decide 
//if roles should be required and dont have default 
//or have default value USER and not required
module.exports = mongoose.model('User', UserSchema);
