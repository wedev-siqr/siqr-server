import { status } from 'server/reply';
import { error } from 'server/router';
import { Context } from 'server/typings/common';
import { membershipRouter } from './routes/membership.router';
import { testRoutes } from './routes/test.router';
import { clientRouter } from './routes/client.router';

export const routes = [
  testRoutes,
  membershipRouter,
  clientRouter,
  error('', (ctx: Context) => status(500).send(ctx.error.message)),
];
