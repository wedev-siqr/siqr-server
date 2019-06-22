import { LoginPayload } from '@siqr/interfaces/authentication.interface';
import { status } from 'server/reply';
import { Context } from 'server/typings/common';

export const login = async (ctx: Context) => {
  // ctx.log.info('[Authentication:Login] Starting');
  // const { password, username }: LoginPayload = ctx.req.body;
  // const user = await User.findAll();
  // ctx.log.debug(`User: ${user}`);
  // if (user) {
  //   ctx.log.info('[Authentication:Login] Authenticated');
  //   return status(200).json(user);
  // } else {
  //   ctx.log.info('[Authentication:Login] Not found');
  //   return status(404);
  // }
};
