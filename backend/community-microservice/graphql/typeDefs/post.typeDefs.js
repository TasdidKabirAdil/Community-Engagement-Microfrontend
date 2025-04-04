//post.typeDefs.js
const postTypeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    type Post {
        id: ID!
        author: User!
        title: String!
        content: String!
        category: String!
        aiSummary: String
        createdAt: String!
        updatedAt: String
    }

    type Query {
        posts: [Post]
        # post(id: ID!): Post
    }

    type Mutation {
        createPost(
            authorId: ID!
            title: String!
            content: String!
            category: String!
        ): Post

        updatePost(
            id: ID!
            title: String
            content: String
            category: String
        ): Post
    }
`

module.exports = postTypeDefs;