const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    preferences: {
        primaryColor: {
            type: String,
            lowercase: true,
            trim: true,
            validate: [
              /^[0-9A-Fa-f]{6}$/,
              "Must be a 6-character hex value"
            ]
        },
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);