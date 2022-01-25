import { gql } from 'apollo-server';

import * as orderService from '../../services/order.service';
import * as customerService from '../../services/customer.service';
import { server } from '../server';

describe('Order Graph', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Mutations', () => {
    test('createOrder', async () => {

      const customer = {
        name: "Test",
        email: "test@test.com",
        phone: "999999999",
        address: "test Address"
      }

      const serviceMock = jest
        .spyOn(orderService, 'createOrder')
        .mockImplementationOnce(async (items, customer, deliveryDate) => ({ id: 1, items: [], totalPrice: 400, customer, deliveryDate }));

      const CREATE_ORDER = gql`
        mutation {
          createOrder(order: {
            customer: {
              name: "${customer.name}"
              email: "${customer.email}"
              phone: "${customer.phone}"
              address: "${customer.address}"
            },
            deliveryDate: 1642949002241,
            items: [{ productId: 1, qtd: 2 }]
          }) {
            id
            totalPrice
          }
        }`;

      const result = await server.executeOperation({
        query: CREATE_ORDER,
      });

      expect(result.errors).toBeUndefined();
      expect(serviceMock).toHaveBeenCalledWith([{ productId: 1, qtd: 2 }], customer, new Date(1642949002241));
    });

  });

  describe('Query', () => {
    describe('query order by id', () => {

      const serviceMock = jest
          .spyOn(orderService, 'getOrderById')
          .mockImplementation(async (id) => ({ id, customerId: 1, items: [], totalPrice: 400, customer: null, deliveryDate: new Date(1642949002241) }));

      const customerMock = { id: 1, name: 'test', address: 'test', email: 'test', phone: 'test' };


      it('should call order service', async  () => {

        const GET_ORDER = gql`
          query {
            order(id: 1) {
              id
              totalPrice
            }
          }`;

        const result = await server.executeOperation({
          query: GET_ORDER,
        });

        expect(result.errors).toBeUndefined();
        expect(serviceMock).toHaveBeenCalledWith(1);
      });


      it('should call customer service using dataloader', async  () => {

        const GET_ORDER = gql`
          query {
            order(id: 1) {
              id
              totalPrice
              customer {
                name
              }
            }
          }`;

        const customerserviceMock = jest
          .spyOn(customerService, 'getCustomerByIds')
          .mockImplementation(async (ids) => ([ customerMock ]) );

        const result = await server.executeOperation({
          query: GET_ORDER,
        });

        expect(result.errors).toBeUndefined();
        expect(customerserviceMock).toBeCalledWith([1]);
        expect(result.data?.order?.customer).toMatchObject({ name: 'test' });
      });


    });
  });

});
