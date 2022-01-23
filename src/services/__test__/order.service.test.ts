import { Customer } from './../../entities/customer.entity';
import { Order, OrderItem } from './../../entities/order.entity';
import { Product } from './../../entities/product.entity';
import { createConnection, getConnection } from 'typeorm';
import { createOrder } from './../order.service';
import * as productService from './../product.service';


describe('Order Service', () => {


  describe('Order Creation', () => {

    beforeAll(() => createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Product, Order, OrderItem, Customer],
      synchronize: true
    }));
  
    afterAll(() => {
      const conn = getConnection();
      jest.clearAllMocks();
      return conn.close();
    });

    const customer = {
      name: 'Customer Test',
      address: 'test street',
      email: 'teste@test.com'
    };

    afterEach(() => jest.clearAllMocks());

    it('should validate items out of stock', async () => {

      const mockProducts = [
        { id: 10, name: 'test', qtd: 10, price: 10 },
        { id: 11, name: 'test', qtd: 1, price: 10 },
      ];

      jest.spyOn(productService, 'getProductByIds').mockImplementationOnce(async () => mockProducts );

      try {
        await createOrder([{ productId: 10, qtd: 2 }, { productId: 11, qtd: 3 }], customer);
      } catch(e) {
        expect(e.message).toBe('product id: 11 is out of stock')
      }

    });

    it('should validate invalid products', async () => {

      const mockProducts = [
        { id: 10, name: 'test', qtd: 10, price: 10 },
      ];

      jest.spyOn(productService, 'getProductByIds').mockImplementationOnce(async () => mockProducts );

      try {
        await createOrder([{ productId: 10, qtd: 2 }, { productId: 11, qtd: 3 }], customer);
      } catch(e) {
        expect(e.message).toBe('some products were not found')
      }

    });

    describe('persisting an order record', () => {

      const mockProducts = [
        { name: 'test', qtd: 10, price: 10 },
        { name: 'test', qtd: 10, price: 12 },
      ];

      let order: Order;
      let products: Product[];

      beforeAll(async () => {
        products = await productService.createProducts(mockProducts);
        order = await createOrder( products.map((p) => ({ productId: p.id, qtd: 2 })), customer);
      });

      it('should created a customer', () => {
        expect(order.customer?.id).toBeDefined();
      });

      it('should registred a correct amount', () => {
        expect(order.totalPrice).toBe(44); // 2 for each item
      });

      it('should have persisted order items', () => {
        expect(order.items?.length).toBe(mockProducts.length);
      });

      it('should have decreased stock', async () => {

        products.forEach((product) => {
          const p = getConnection().getRepository(Product).findOne(product.id);
          expect(p).resolves.toMatchObject({
            ...product,
            qtd: product.qtd - 2
          });
        })
      });

    });

  });

});