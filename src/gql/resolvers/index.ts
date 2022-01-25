import { generateToken } from './../../services/auth.service';

export const mainResolver = {
  Query: {
    version: () => '0.0.1',
  },

  Mutation: {
    login: (_: any, { username, pass }: { username: string; pass: string }) =>
      generateToken(username, pass),
  },
};

export * from './product.resolver';
export * from './order.resolver';
