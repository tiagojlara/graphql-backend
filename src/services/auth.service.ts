import jwt from 'jsonwebtoken';

import { logger } from '../utils/logger';

export interface IUser {
  username: string;
  pass: string;
  rule: string;
}

const secret = process.env.APP_SECRET || 'secret_default';

export const validateCredentials = (username: string, pass: string): IUser => {
  if (username === 'test' && pass == 'test') {
    return { username, pass, rule: 'SELLER' };
  }
  throw new Error('Invalid Credentials');
};

export const generateToken = (username: string, pass: string) =>
  jwt.sign(validateCredentials(username, pass), secret);

export const validateToken = (token: string): IUser => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    logger.error('TOKEN_ERROR', e);
    throw new Error('Invalid Credentials');
  }
};
