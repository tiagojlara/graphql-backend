import { createConnection, getConnection } from 'typeorm';

import { Product } from '../../entities/product.entity';
import { createProduct, createProducts, getProductById, getProductByIds } from '../product.service';

describe('Product Service', () => {
  beforeEach(() =>
    createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Product],
      synchronize: true,
    }),
  );

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  it('store product in database', async () => {
    const product = await createProduct({ name: 'product test', qtd: 1, price: 10 });

    const recoveredPrice = await getProductById(product.id);

    expect(product.id).toBe(recoveredPrice.id);
    expect(product.qtd).toBe(recoveredPrice.qtd);
  });

  it('store multiple products in database', async () => {
    const products = [
      { name: 'product test', qtd: 1, price: 10 },
      { name: 'product test 2', qtd: 1, price: 12 },
    ];

    const records = await createProducts(products);
    const recovered = await getProductByIds(records.map((p) => p.id));
    const countRecords = await getConnection().getRepository(Product).count();

    expect(recovered.length).toBe(products.length);
    expect(countRecords).toBe(2);
  });
});
