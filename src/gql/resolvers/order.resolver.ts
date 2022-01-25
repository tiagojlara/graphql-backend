import { Order, OrderItem } from './../../entities/order.entity';
import { createOrder, getOrderById } from './../../services/order.service';
import { Context } from './../../utils';

interface OrderInput {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  deliveryDate: Date;
  items: { productId: number; qtd: number }[];
}

export const OrderResolver = {
  Order: {
    customer: (parent: Order, _, context: Context) =>
      parent.customer || context.customersLoader.load(parent.customerId),

    items: (parent: Order, _, context: Context) =>
      parent.items || context.orderItemsLoader.load(parent.id),
  },

  OrderItem: {
    product: (parent: OrderItem, _, context: Context) =>
      parent.product || context.productLoader.load(parent.productId),
  },

  Mutation: {
    createOrder: (_: any, { order }: { order: OrderInput }) =>
      createOrder(order.items, order.customer, order.deliveryDate),
  },
  Query: {
    order: (_: any, { id }: { id: number }) => getOrderById(id),
  },
};
