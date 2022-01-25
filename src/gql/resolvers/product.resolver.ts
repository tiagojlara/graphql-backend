import { Product } from '../../entities/product.entity';
import {
  createProduct,
  createProducts,
  getProductById,
  getProducts,
  getProductsInStock,
} from '../../services/product.service';

export const ProductResolver = {
  Mutation: {
    createProduct: (_: any, { product }: { product: Product }) => createProduct(product),
    createProducts: (_: any, { products }: { products: Product[] }) => createProducts(products),
  },

  Query: {
    getProductById: (_: any, { id }: { id: number }) => getProductById(id),

    products: async (_: any, { filters }: { filters: { skip: number; limit: number } }) =>
      getProducts(filters).then(([records, total]) => ({ records, total })),

    availableProducts: async (_: any, { filters }: { filters: { skip: number; limit: number } }) =>
      getProductsInStock(filters).then(([records, total]) => ({ records, total })),
  },
};
