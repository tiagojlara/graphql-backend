import 'dotenv/config';
import { connection } from './database';
import { server } from './gql/server';
import { logger } from './utils/logger';

connection
  .then(() => server.listen().then(({ url }) => logger.info(`server running at url ${url}`)))
  .catch((e) => logger.error('error to start a database connection', e));
