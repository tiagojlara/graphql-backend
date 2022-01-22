import { gql } from 'apollo-server';

export const ProductSchema = gql`
  type Product {
    id: Int
    name: String
    qtd: Float
    price: Float
  }
`;
