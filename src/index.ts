import { server } from './gql/server';
import { logger } from './utils/logger';
import { connection } from './database';

connection.then(() =>
  server
    .listen()
    .then(({ url }) => logger.info(`server running at url ${url}`))
);
