import { server } from "./gql/server";
import { logger } from "./utils/logger";

server.listen().then(({ url }) => logger.info(`server running at url ${url}`) );
