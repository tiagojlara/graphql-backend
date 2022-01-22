import { gql } from 'apollo-server';

export const mainSchema = gql`
  scalar Date

  type Query {
    version: String
  }
`;

export * from './product.schema';
