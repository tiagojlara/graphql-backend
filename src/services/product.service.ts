import { Product } from '../entities/product.entity';
import { getConnection } from 'typeorm';

const repository = () => getConnection().getRepository(Product)

export const createProduct = (payload: Product) => repository().save(payload);

export const createProducts = (payload: Product[]) => repository().save(payload);

export const getProductById = (id: number) => repository().findOneOrFail({ where: { id } });

export const getProductByIds = (ids: number[]) => repository().findByIds(ids);
