import { gql } from 'apollo-server';

export const mainSchema = gql`
  scalar Date

  type Query {
    version: String
  }

  type Mutation {
    version: String
  }
`;

export * from './product.schema';
export * from './customer.schema';
export * from './order.schema';
