import { status } from 'server/reply';
import { Context } from 'server/typings/common';
import sequelize from '../helpers/db-helper';
import clientModel from '../models/client.model';
import paymentModel from '../models/payment.model';

const Client = clientModel(sequelize);
const Payment = paymentModel(sequelize);

export const accessWithCode = async (ctx: Context) => {
  ctx.log.info('Starting accessWithCode');
  const { code } = ctx.req.body;
  try {
    ctx.log.info('Search client with code: %s', code);
    const client: any = await Client.findOne({
      where: { code },
    });
    if (!client) {
      ctx.log.error("Client with code %s doesn't exist.", code);
      return status(200).json({
        message: `Client with code ${code} doesn't exist.`,
        username: '',
      });
    }

    return status(200).json({
      username: `${client.name} ${client.firstSurname} ${client.secondSurname}`,
    });
  } catch (error) {
    ctx.log.error('Finishing accessWithCode with errors');
    return status(409).json(error);
  }
};
