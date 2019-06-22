import sequelize from '@siqr/helpers/db-helper';
import clientModel from '@siqr/models/client.model';
import { Membership } from '@siqr/models/membership.model';
import paymentModel from '@siqr/models/payment.model';
import { status } from 'server/reply';
import { Context } from 'server/typings/common';

const Client = clientModel(sequelize);
const Payment = paymentModel(sequelize);

export const accessWithCode = async (ctx: Context) => {
  ctx.log.info('Starting accessWithCode');
  const { accessCode } = ctx.req.body;
  try {
    ctx.log.info('Search client with code: %s', accessCode);
    const client = await Client.findOne({
      where: { code: accessCode },
      include: [
        {
          model: Membership,
          as: 'membership',
        },
      ],
    });
    if (!client) {
      ctx.log.error("Client with code %s doesn't exist.", accessCode);
      return status(404).json({
        message: `Client with code ${accessCode} doesn't exist.`,
      });
    }
  } catch (error) {
    ctx.log.error('Finishing accessWithCode with errors');
    return status(409).json(error);
  }
};
