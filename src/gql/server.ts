import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import merge from 'lodash/merge';
import * as resolvers from './resolvers';
import * as schemas from './schemas';
import * as scalars from './scalars';

const schema = makeExecutableSchema({
  typeDefs: Object.values(schemas),
  resolvers: merge(Object.values({ ...resolvers, ...scalars })),
});

export const server = new ApolloServer({ schema });
