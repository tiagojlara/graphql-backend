import DataLoader from 'dataloader';

import { OrderItem } from './../../entities/order.entity';
import { getOrdersItems } from './../../services/order.service';
import { hydrateArrayDataLoader } from './../../utils';

type BatchManyOrderItems = (ids: number[]) => Promise<OrderItem[][]>;

const batchOrderItems: BatchManyOrderItems = async (ids: number[]) => {
  const items = await getOrdersItems(ids);
  return hydrateArrayDataLoader<OrderItem>(items, ids, 'orderId');
};

export const orderItemsLoader = () => new DataLoader<number, OrderItem[]>(batchOrderItems);
