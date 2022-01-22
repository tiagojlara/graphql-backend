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

  describe('Mutations', () => {

    test('createProduct', async () => {

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

    test('createProducts', async () => {

      const serviceMock = jest.spyOn(productService, 'createProducts').mockImplementationOnce(async () => [productMock]);

      const CREATE_PRODUCT = gql`
        mutation {
          createProducts(products: [{
            name: "${productMock.name}",
            qtd: ${productMock.qtd}
            price: ${productMock.price}
          }]) {
            name,
            qtd,
            price
          }
        }`;

      const result = await server.executeOperation({
        query: CREATE_PRODUCT,
      });

      expect(result.errors).toBeUndefined();
      expect(serviceMock).toHaveBeenCalledWith([{...productMock}]);
      expect(result.data).toMatchObject({
        createProducts: expect.arrayContaining([
          expect.objectContaining(productMock)
        ])
      });

    });

  });


  describe('Query', () => {

    test('getProductById', async () => {

      const serviceMock = jest.spyOn(productService, 'getProductById')
        .mockImplementationOnce(async (id) => ({ id, ...productMock}) );

      const GET_PRODUCT = gql`
        query {
          getProductById(id: 10) {
            id
            name,
            qtd,
            price
          }
        }`;

      const result = await server.executeOperation({
        query: GET_PRODUCT,
      });

      expect(result.errors).toBeUndefined();
      expect(serviceMock).toHaveBeenCalledWith(10);
      expect(result.data).toMatchObject({
        getProductById: expect.objectContaining({id: 10, ...productMock})
      });

    });

    test('products', async () => {

      const serviceMock = jest.spyOn(productService, 'getProducts')
        .mockImplementationOnce(async () => [[productMock], 1 ]);

      const GET_PRODUCTS = gql`
        query {
          products(filters: {
            skip: 0,
            limit: 10
          }) {
            records {
              id
              name,
              qtd,
              price
            }
            total
          }
        }`;

      const result = await server.executeOperation({
        query: GET_PRODUCTS,
      });

      expect(result.errors).toBeUndefined();
      expect(serviceMock).toHaveBeenCalledWith({ skip: 0, limit: 10 });
      expect(result.data?.products).toMatchObject({
        records: expect.arrayContaining([
          expect.objectContaining(productMock)
        ]),
        total: 1
      });

    });

  });

})
