import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';
import merge from 'lodash/merge';

import { authDirective } from './directives/auth.directive';
import { customersLoader } from './loaders/customer.loader';
import { orderItemsLoader } from './loaders/order.loader';
import { productLoader } from './loaders/product.loader';
import * as resolvers from './resolvers';
import * as scalars from './scalars';
import * as schemas from './schemas';

const { authDirectiveTransformer } = authDirective('auth');

const schema = authDirectiveTransformer(
  makeExecutableSchema({
    typeDefs: Object.values(schemas),
    resolvers: merge(Object.values({ ...resolvers, ...scalars })),
  }),
);

export const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      customersLoader: customersLoader(),
      orderItemsLoader: orderItemsLoader(),
      productLoader: productLoader(),
      authToken: req?.headers?.Authorization,
    };
  },
});
