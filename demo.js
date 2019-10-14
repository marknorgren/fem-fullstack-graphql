const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
    type User {
        email: String!
        avatar: String
        friends: [User]!
    }

    type Query {
        me: User!
    }
`


const resolvers = {
    Query: {
        me() {
            return {
                email: 'mark@marknorgren.com',
                avatar: 'http://marknorgren.com/avator.png',
                friends: []
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(() => 
        console.log("Started server on 4000")
    )