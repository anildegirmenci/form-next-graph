const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
    consent: Boolean!
  }

  type Mutation {
    addUser(name: String!, email: String!, phone: String!, consent: Boolean!): User
  }
`;

// Resolvers
const resolvers = {
  Mutation: {
    addUser: (parent, args) => {
      const newUser = {
        id: Date.now().toString(),
        ...args,
      };
      return newUser;
    },
  },
};

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
