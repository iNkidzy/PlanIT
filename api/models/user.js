const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, min: 4, max: 15 },
    name: { type: String, required: false, min: 4, max: 50 },
    password: { type: String, required: true, min: 6, max: 255, select: false },
    email: { type: String, required: true, min: 6, max: 255, unique: true },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    date: { type: Date, default: Date.now }
})
// TODO: Discuss properties if needed
module.exports = mongoose.model('User', UserSchema);
