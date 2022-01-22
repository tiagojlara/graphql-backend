import { createProduct } from '../../services/product.service';

export const ProductResolver = {

  Mutation: {
    createProduct: (_: any, { product }) => createProduct(product)
  }

};
