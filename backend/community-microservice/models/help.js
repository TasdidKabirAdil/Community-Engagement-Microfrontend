//help.js
const mongoose = require('mongoose')

const HelpSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    location: String,
    isResolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

const Help = mongoose.model('Help', HelpSchema)

module.exports = Help;  