import { json, status } from 'server/reply';
import { Context } from 'server/typings/common';

export const index = (ctx: Context | any) => {
  ctx.log.info('Starting test index controller');
  return json({
    hello: 'index',
  });
};

export const home = (ctx: Context | any) => {
  ctx.log.info('Starting test home controller');
  return status(200).json({
    message: 'Home test',
  });
};
