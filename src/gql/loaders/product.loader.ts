import DataLoader from 'dataloader';

import { Product } from './../../entities/product.entity';
import { getProductByIds } from './../../services/product.service';
import { hydrateDataLoader } from './../../utils';

type BatchProduct = (ids: number[]) => Promise<Product[]>;

const batchProductsById: BatchProduct = async (ids: number[]) => {
  const products = await getProductByIds(ids);
  return hydrateDataLoader<Product>(products, ids);
};

export const productLoader = () => new DataLoader<number, Product>(batchProductsById);
