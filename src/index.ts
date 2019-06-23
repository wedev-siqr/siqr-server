import { Context } from 'server/typings/common';
import { Options } from 'server/typings/options';
import sequelize from './helpers/db-helper';
import { routes } from './router';
import { header } from 'server/reply';

const dotenv = require('dotenv');
const server = require('server');

const env = dotenv.config();

if (env.error) {
  throw env.error;
}

const serverConfig: Options | any = {
  security: {
    csrf: false,
  },
};

const cors = [
  () => header('Access-Control-Allow-Origin', '*'),
  () =>
    header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    ),
  () =>
    header(
      'Access-Control-Allow-Methods',
      'GET, PUT, PATCH, POST, DELETE, HEAD'
    ),
  (ctx: Context) => (ctx.method.toLowerCase() === 'options' ? 200 : false),
];

(async () => {
  try {
    console.log('[Database] Conecting...');
    await sequelize.authenticate();
    console.log('[Database] Connection stable.');
  } catch (err) {
    console.error('[Database] Conection error:', err);
    process.exit(1);
  }

  try {
    console.log('[Database] Syncing models...');
    await sequelize.sync();
    console.log('[Database] Synced models.');
  } catch (err) {
    console.error('[Database] Sync error:', err);
    process.exit(1);
  }

  try {
    console.log('[Server] Starting...');
    const ctx: Context = await server(serverConfig, cors, routes);
    console.log('[Server] Started on port', ctx.options.port);
  } catch (err) {
    console.error('[Server] Bootstrap error:', err);

    console.log('[Database] Closing connection...');
    sequelize.close();
    console.log('[Database] Closed connection.');

    process.exit(1);
  }
})();
