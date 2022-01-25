import { gql } from 'apollo-server';

export const ProductSchema = gql`
  type Product {
    id: Int
    name: String
    qtd: Float
    price: Float
  }

  type ProductSearchResponse {
    records: [Product]
    total: Int
  }

  input ProductInput {
    name: String!
    qtd: Float!
    price: Float!
  }

  input ProductFilter {
    skip: Int!
    limit: Int!
  }

  extend type Query {
    getProductById(id: Int): Product
    products(filters: ProductFilter): ProductSearchResponse @auth(requires: SELLER)
    availableProducts(filters: ProductFilter): ProductSearchResponse
  }

  extend type Mutation {
    createProduct(product: ProductInput): Product @auth(requires: SELLER)
    createProducts(products: [ProductInput]): [Product] @auth(requires: SELLER)
  }
`;
