import { gql } from 'apollo-server';

export const OrderSchema = gql`
  type Order {
    id: Int
    customer: Customer
    products: [Product]
    deliveryDate: Date
    totalPrice: String
  }
`;
