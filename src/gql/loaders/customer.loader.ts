import DataLoader from 'dataloader';

import { Customer } from './../../entities/customer.entity';
import { getCustomerByIds } from './../../services/customer.service';
import { hydrateDataLoader } from './../../utils';

type BatchCustomer = (ids: number[]) => Promise<Customer[]>;

const batchCustomersById: BatchCustomer = async (ids: number[]) => {
  const customers = await getCustomerByIds(ids);
  return hydrateDataLoader<Customer>(customers, ids);
};

export const customersLoader = () => new DataLoader<number, Customer>(batchCustomersById);
