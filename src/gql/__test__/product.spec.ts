import { gql } from 'apollo-server';
import * as productService from '../../services/product.service';
import { server } from '../server';

describe('Product Graph', () => {

  const productMock = {
    name: 'test product',
    qtd: 10,
    price: 20
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct mutation', () => {

    it('should call product service', async () => {

      const serviceMock = jest.spyOn(productService, 'createProduct').mockImplementationOnce(async () => productMock);

      const CREATE_PRODUCT = gql`
        mutation {
          createProduct(product: {
            name: "${productMock.name}",
            qtd: ${productMock.qtd}
            price: ${productMock.price}
          }) {
            name,
            qtd,
            price
          }
        }`;

      const result = await server.executeOperation({
        query: CREATE_PRODUCT,
      });

      expect(result.errors).toBeUndefined();
      expect(serviceMock).toHaveBeenCalledWith({...productMock});
      expect(result.data?.createProduct?.name).toBe(productMock.name);

    });

  });

})
