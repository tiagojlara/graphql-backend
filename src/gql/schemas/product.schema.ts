import { gql } from 'apollo-server';

export const ProductSchema = gql`
  type Product {
    productId: Int
    name: String
    qtd: Float
    price: Float
  }
`;
