import { gql } from 'apollo-server';

export const OrderSchema = gql`
  type OrderItem {
    product: Product
    qtd: Float
    price: Float
  }

  type Order {
    id: Int
    customer: Customer
    items: [OrderItem]
    deliveryDate: Date
    totalPrice: String
  }

  input CustomerInput {
    name: String
    email: String
    phone: String
    address: String
  }

  input OrderItemInput {
    productId: Int
    qtd: Float
  }

  input OrderInput {
    customer: CustomerInput
    deliveryDate: Date
    items: [OrderItemInput]
  }

  extend type Mutation {
    createOrder(order: OrderInput): Order
  }
`;
