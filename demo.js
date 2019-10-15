const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`

    enum ShoeType {
        JORDAN
        NIKE
        ADIDAS
    }

    type User {
        email: String!
        avatar: String
        friends: [User]!
        shoes: [Shoe]!
    }

    interface Shoe {
        brand: ShoeType!
        size: Int!
        user: User!
    }

    type Sneaker implements Shoe {
        brand: ShoeType!
        size: Int!
        sport: String!
    }

    type Boot implements Shoe {
        brand: ShoeType!
        size: Int!
        steelToe: Boolean
    }

    input ShoesInput {
        brand: ShoeType
        size: Int
    }

    type Query {
        me: User!
        meJson: String!
        shoes: [Shoe]!
    }

    input NewShoeInput {
        brand: ShoeType!
        size: Int!
    }

    type Mutation {
        newShoe(input: NewShoeInput!): Shoe!
    }
`


const resolvers = {
    Query: {
        me() {
            return {
                email: 'mark@marknorgren.com',
                avatar: 'http://marknorgren.com/avatar.png',
                friends: []
            }
        },
        meJson() {
            me = {
                email: 'mark@marknorgren.com',
                avatar: 'http://marknorgren.com/avatar.png',
                friends: []
            }
            return JSON.stringify(me)
        },
        shoes(_, {input}) {
            return [
                {brand: NIKE, size: 12},
                {brand: JORDAN, size: 13}
            ]
        }
    },
    Mutation: {
        newShoe(_, {input}) {
            return input
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