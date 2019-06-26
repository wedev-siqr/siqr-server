import { status } from 'server/reply';
import { error } from 'server/router';
import { Context } from 'server/typings/common';
import { membershipRouter } from './routes/membership.router';
import { testRoutes } from './routes/test.router';
import { clientRouter } from './routes/client.router';
import { paymentRouter } from './routes/payment.router';
import { authenticationRoutes } from './routes/authentication.router';

export const routes = [
  testRoutes,
  authenticationRoutes,
  membershipRouter,
  clientRouter,
  paymentRouter,
  error('', (ctx: Context) => status(500).send(ctx.error.message)),
];
