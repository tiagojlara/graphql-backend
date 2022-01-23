import { createOrder } from './../../services/order.service';

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
  Mutation: {
    createOrder: (_: any, { order }: { order: OrderInput }) =>
      createOrder(order.items, order.customer),
  },
};
