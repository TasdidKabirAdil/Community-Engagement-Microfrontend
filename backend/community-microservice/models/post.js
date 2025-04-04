//post.js
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['News', 'Discussion'], required: true },
    aiSummary: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post;