import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    auth: AuthState
  }

  extend type Mutation {
    updateToken(token: String): String
  }

  type AuthState {
    token: String
  }
`;

export default typeDefs;
