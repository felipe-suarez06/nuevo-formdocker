//eschema

import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

const typeDefs = gql`
  scalar Date
  
  type Query {
    hello: String
    formResponse: [FormResponse]
  }

  type Mutation {
    submitForm(input: FormInput!): FormResponse
  }

  input FormInput {
    nombre: String!
    apellido: String!
    asunto: String!
    archivo: String!
    fecharegistro: Date!


  }

  type FormResponse {
    id: ID!
    nombre: String!
    apellido: String!
    asunto: String!
    archivo: String!
    fecharegistro: Date!

  }
`;

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

export default schema;
