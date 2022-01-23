import { getConnection } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { Order } from './../entities/order.entity';
import { Product } from './../entities/product.entity';
import { findOrCreateCustomer } from './customer.service';
import { decreaseStock, getProductByIds } from './product.service';

interface OrderItemsInput {
  productId: number;
  qtd: number;
}

const repository = () => getConnection().getRepository(Order);

const validateStock = (items: { [key: number]: number }) => (products: Product[]) =>
  products.map((p) => {
    if (items[p.id] > p.qtd) {
      throw new Error(`product id: ${p.id} is out of stock`);
    }

    return p;
  });

export const createOrder = async (items: OrderItemsInput[], customer: Customer) => {
  const [productIds, productMap] = items.reduce(
    (pv, cv) => {
      pv[0].push(cv.productId);
      pv[1][cv.productId] = cv.qtd;
      return pv;
    },
    [[], {}],
  );

  const products = await getProductByIds(productIds).then(validateStock(productMap)); // eslint-disable-line

  if (products.length < productIds.length) {
    throw new Error('some products were not found');
  }

  const [orderItemsPayload, totalPrice] = products.reduce(
    (pv, cv) => {
      pv[0].push({ product: cv, qtd: productMap[cv.id], price: cv.price });
      pv[1] += cv.price * productMap[cv.id];
      return pv;
    },
    [[], 0],
  );

  const customerEntity = await findOrCreateCustomer(customer);

  const order = await repository().save({
    items: orderItemsPayload,
    customer: customerEntity,
    totalPrice,
  });

  await Promise.all(products.map(({ id }) => decreaseStock(Number(id), Number(productMap[id]))));

  return order;
};
