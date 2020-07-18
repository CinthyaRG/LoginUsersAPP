import { ApolloServer, gql } from 'apollo-server-express';
import { userResolvers } from './resources/user';

const typeDefs = gql`
type User {
    _id: ID!
    token: String
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    image: String
  }
  
  type Query {
    users: [User]
    user_auth: User
  }
  
  type Response {
    token: String
    firstname: String
    lastname: String
    email: String
    image: String
    errors: [String]
  }
  
  input UserInputRegister {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    image: Upload
  }
  
  input UserInputLogin {
    email: String!
    password: String!
  }
  
  input UserInputUpdate {
    firstname: String
    lastname: String
    email: String
    password: String
    image: Upload
  }
  
  type Mutation {
    createUser(input: UserInputRegister!): Response
    deleteUser(_id: ID!): User
    updateUser(_id: ID!, input: UserInputUpdate!): User
    loginUser(input: UserInputLogin!): Response
  }`;

export const graphqlRouter = new ApolloServer(
  {
    typeDefs,
    resolvers: userResolvers,
    context: ({ req, res }) => ({ user: req.user })
  }
);