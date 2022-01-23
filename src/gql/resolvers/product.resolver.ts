import {
  createProduct,
  createProducts,
  getProductById,
  getProducts,
} from '../../services/product.service';

export const ProductResolver = {
  Mutation: {
    createProduct: (_: any, { product }) => createProduct(product),
    createProducts: (_: any, { products }) => createProducts(products),
  },

  Query: {
    getProductById: (_: any, { id }) => getProductById(id),

    products: async (_: any, { filters }) =>
      getProducts(filters).then(([records, total]) => ({ records, total })),
  },
};
