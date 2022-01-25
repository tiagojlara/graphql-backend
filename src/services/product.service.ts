import { getConnection } from 'typeorm';

import { Product } from '../entities/product.entity';

const repository = () => getConnection().getRepository(Product);

export const createProduct = (payload: Product) => repository().save(payload);

export const createProducts = (payload: Product[]) => repository().save(payload);

export const getProductById = (id: number) => repository().findOneOrFail({ where: { id } });

export const getProductByIds = (ids: number[]) => repository().findByIds(ids);

export const getProducts = (filters: { skip: number; limit: number }) =>
  repository().findAndCount({ skip: filters.skip, take: filters.limit });

export const getProductsInStock = (filters: { skip: number; limit: number }) =>
  repository().findAndCount({ skip: filters.skip, take: filters.limit, where: { qtd: { $gte: 1 } } });

export const decreaseStock = (id: number, qtd: number) =>
  getProductById(id)
    .then((p) => ({ ...p, qtd: p.qtd - qtd }))
    .then((p) => repository().save(p));
