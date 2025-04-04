//index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');

const connectDB = require('./configs/mongoose')
const postTypeDefs = require('./graphql/typeDefs/post.typeDefs')
const helpTypeDefs = require('./graphql/typeDefs/help.typeDefs')
const postResolvers = require('./graphql/resolvers/post.resolvers')
const helpResolvers = require('./graphql/resolvers/help.resolvers')

const startServer = async() => {
    const typeDefs = mergeTypeDefs([postTypeDefs, helpTypeDefs])
    const resolvers = mergeResolvers([postResolvers, helpResolvers])
    const app = express()

    app.use(cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'https://studio.apollographql.com'
        ],
        credentials: true
    }))

    app.use(cookieParser())

    await connectDB()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res })
    })

    await server.start()
    server.applyMiddleware({ app, path: '/graphql', cors: false })

    const PORT = 4002

    app.listen(PORT, () => {
        console.log(`🚀 Auth service running at http://localhost:${PORT}${server.graphqlPath}`)
    })
}

startServer()