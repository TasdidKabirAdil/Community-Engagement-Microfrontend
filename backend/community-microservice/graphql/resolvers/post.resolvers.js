const Post = require('../../models/post')
const User = require('../../../user-auth-microservice/models/user')

const postResolvers = {
    Query: {
        posts: async () => {
            try {
                const posts = await Post.find().populate('author')
                return posts.map((post) => ({
                    id: post._id.toString(),
                    ...post.toObject(),
                    author: {
                        id: post.author._id.toString(),
                        username: post.author.username
                    }
                }))
            } catch (error) {
                console.error('Error fetching posts', error)
                throw new Error('Failed to fetch posts')
            }
        },

        // post: async (_, { id }) => {
        //     try {
        //         const post = await Post.findById(id)
        //         if (!post) {
        //             throw new Error(`Post with ${id} doesn't exist`)
        //         }
        //         return {
        //             id: post._id.toString(),
        //             ...post.toObject(),
        //             author: {
        //                 id: post.author._id.toString()
        //             }
        //         }
        //     } catch (error) {
        //         console.error(`Error fetching post with ${id}`, error)
        //         throw new Error('Failed to fetch post')
        //     }
        // }
    },

    Mutation: {
        createPost: async (_, { authorId, title, content, category }) => {
            try {
                const newPost = new Post({ author: authorId, title, content, category })
                await newPost.save()
                return {
                    id: newPost._id.toString(),
                    ...newPost.toObject()
                }
            } catch (error) {
                console.error('Error creating post', error)
                throw new Error('Failed to create post')
            }
        },

        updatePost: async (_, { id, title, content, category }) => {
            try {
                const updatedPost = await Post.findByIdAndUpdate(id, { title, content, category, updatedAt: new Date() }, { new: true })
                if (!updatedPost) {
                    throw new Error(`Updating post with ${id} not found`)
                }
                return {
                    id: updatedPost._id.toString(),
                    ...updatedPost.toObject()
                }
            } catch (error) {
                console.error('Error updating post', error)
                throw new Error('Failed to update post')
            }
        }
    }
}

module.exports = postResolvers;