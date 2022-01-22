import { createConnection } from 'typeorm';
import { logger } from './utils/logger';

export const connection = createConnection().catch(error => logger.error('DATABASE_CONN_ERROR', error));
