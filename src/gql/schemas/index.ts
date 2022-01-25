import { gql } from 'apollo-server';

export const mainSchema = gql`
  scalar Date

  enum Role {
    SELLER
    UNKNOWN
  }

  directive @auth(requires: Role = SELLER) on OBJECT | FIELD_DEFINITION

  type Query {
    version: String
  }

  type Mutation {
    login(username: String, pass: String): String
  }
`;

export * from './product.schema';
export * from './customer.schema';
export * from './order.schema';
