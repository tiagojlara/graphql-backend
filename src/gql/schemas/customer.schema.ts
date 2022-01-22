import { gql } from 'apollo-server';

export const CustomerSchema = gql`
  type Customer {
    id: Int
    name: String
    email: String
    phone: String
    address: String
  }
`;
