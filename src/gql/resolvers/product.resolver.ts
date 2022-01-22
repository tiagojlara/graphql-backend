import { createProduct, createProducts } from '../../services/product.service';

export const ProductResolver = {

  Mutation: {
    createProduct: (_: any, { product }) => createProduct(product),
    createProducts: (_: any, { products }) => createProducts(products)
  }

};
