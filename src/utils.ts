import { productLoader } from './gql/loaders/product.loader';
import { groupBy } from 'lodash';

import { customersLoader } from './gql/loaders/customer.loader';
import { orderItemsLoader } from './gql/loaders/order.loader';

export interface Context {
  customersLoader?: ReturnType<typeof customersLoader>;
  orderItemsLoader?: ReturnType<typeof orderItemsLoader>;
  productLoader?: ReturnType<typeof productLoader>;
}

interface IGeneric {
  id?: number;
}

export const hydrateDataLoader = <T extends IGeneric>(datas: T[], keys: number[]): T[] => {
  const dataMap: { [key: number]: T } = {};
  datas.forEach((data: T) => {
    dataMap[data.id] = data;
  });

  return keys.map((id) => dataMap[id]);
};

export const hydrateArrayDataLoader = <T>(datas: T[], keys: number[], groupByKey = 'id') => {
  return keys.map((id) => groupBy<T>(datas, groupByKey)[id]);
};
