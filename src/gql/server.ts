import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import merge from 'lodash/merge';
import * as resolvers from './resolvers';

import { logger } from '../utils/logger';

export const mainSchema = gql`
  type Query {
    version: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: mainSchema,
  resolvers: merge(Object.values({ ...resolvers })),
});

export const server = new ApolloServer({ schema });
