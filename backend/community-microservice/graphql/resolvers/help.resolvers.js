const Help = require('../../models/help')
const User = require('../../../user-auth-microservice/models/user')

const helpResolvers = {
    Query: {
        helps: async () => {
            try {
                const helps = await Help.find().populate('author')
                return helps.map((help) => ({
                    id: help._id.toString(),
                    ...help.toObject(),
                    author: {
                        id: help.author._id.toString(),
                        username: help.author.username
                    }
                }))
            } catch (error) {
                console.error('Error fetching helps', error)
                throw new Error('Failed to fetch helps')
            }
        },

        // help: async(_, {id}) => {
        //     try {
        //         const help = await Help.findById(id)
        //         if(!help) {
        //             throw new Error(`help with ${id} doesn't exist`)
        //         }
        //         return {
        //             id: help._id.toString(),
        //             ...help.toObject(),
        //             author: {
        //                 id: help.author._id.toString()
        //             }
        //         }
        //     } catch (error) {
        //         console.error(`Error fetching help with ${id}`, error)
        //         throw new Error('Failed to fetch help')
        //     }
        // }
    },

    Mutation: {
        createHelp: async (_, { authorId, description, location }) => {
            try {
                const newHelp = new Help({ author: authorId, description, location })
                await newHelp.save()
                return {
                    id: newHelp._id.toString(),
                    ...newHelp.toObject()
                }
            } catch (error) {
                console.error('Error creating help', error)
                throw new Error('Failed to create help')
            }
        },

        updateHelp: async (_, { id, description, location, isResolved }) => {
            try {
                const updatedHelp = await Help.findByIdAndUpdate(id, { description, location, updatedAt: new Date(), isResolved }, { new: true })
                if (!updatedHelp) {
                    throw new Error(`Updating help with ${id} not found`)
                }
                return {
                    id: updatedHelp._id.toString(),
                    ...updatedHelp.toObject()
                }
            } catch (error) {
                console.error('Error updating help', error)
                throw new Error('Failed to update help')
            }
        }
    }
}

module.exports = helpResolvers;