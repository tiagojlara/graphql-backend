import { gql } from 'apollo-server';
import { Order } from './../../entities/order.entity';

import * as orderService from '../../services/order.service';
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

});
