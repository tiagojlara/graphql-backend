export const mainResolver = {
  Query: {
    version: () => '0.0.1',
  },
};

export * from './product.resolver';
export * from './order.resolver';
