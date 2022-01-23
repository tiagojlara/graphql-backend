import { Customer } from './entities/customer.entity';
import { Order, OrderItem } from './entities/order.entity';
import { createConnection } from 'typeorm';

import { Product } from './entities/product.entity';
import { logger } from './utils/logger';

export const connection = createConnection({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [Product, Order, OrderItem, Customer],
  synchronize: true,
}).catch((error) => logger.error('DATABASE_CONN_ERROR', error));
