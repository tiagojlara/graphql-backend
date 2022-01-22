import { gql } from 'apollo-server';

export const ProductSchema = gql`
  type Product {
    id: Int
    name: String
    qtd: Float
    price: Float
  }

  input ProductInput {
    name: String
    qtd: Float
    price: Float
  }

  extend type Mutation {
    createProduct(product: ProductInput): Product
    createProducts(products: [ProductInput]): [Product]
  }
`;
