import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';
import merge from 'lodash/merge';

import * as resolvers from './resolvers';
import * as scalars from './scalars';
import * as schemas from './schemas';

const schema = makeExecutableSchema({
  typeDefs: Object.values(schemas),
  resolvers: merge(Object.values({ ...resolvers, ...scalars })),
});

export const server = new ApolloServer({ schema });
