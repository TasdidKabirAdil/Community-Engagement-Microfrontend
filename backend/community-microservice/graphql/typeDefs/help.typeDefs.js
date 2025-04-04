//help.typeDefs.js
const helpTypeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    type Help {
        id: ID!
        author: User!
        description: String!
        location: String!
        isResolved: Boolean!
        createdAt: String!
        updatedAt: String
    }

    type Query {
        helps: [Help]
        # help(id: ID!): Help
    }

    type Mutation {
        createHelp(
            authorId: ID!
            description: String!
            location: String!
        ): Help

        updateHelp(
            id: ID!
            description: String
            location: String
            isResolved: Boolean
        ): Help
    }
`

module.exports = helpTypeDefs;