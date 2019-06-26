import { status } from 'server/reply';
import { Context } from 'server/typings/common';
import { Client, Payment } from 'src/models';
import { json } from 'body-parser';
import sequelize from 'src/helpers/db-helper';
import moment = require('moment');

export const getPayments = async ({ log, req }: Context) => {
  log.info('Starting getPayments');
  const { code } = req.query;

  if (!code)
    return status(400).json({
      message: 'Code must be supplied.',
    });

  try {
    log.info('Getting user');
    const client: any = await Client.findOne({
      where: { code },
      attributes: ['id'],
    });

    log.info('Getting payments for user: %d', client.id);
    const payments = await Payment.findAll({ where: { client_id: client.id } });

    log.info('Finishing getPayments');
    return status(200).json(payments);
  } catch (error) {
    log.error('Finishing getPayments with error: %j', error);
    return status(500).json(error);
  }
};

export const registerPayment = async (ctx: Context) => {
  ctx.log.info('Starting registerPayment');
  const id = ctx.params.id;
  const { amount } = ctx.req.body;

  ctx.log.info('Creating payment for: %s - %s', id, amount);
  try {
    const date = moment().format('YYYY-MM-DD');

    console.log({ date });

    sequelize.query(
      `INSERT INTO payment(date, quantity,client_id) VALUES ('${date}',${amount}, ${id})`
    );
    // await Payment.create({
    //   client_id: id,
    //   date: new Date(),
    //   quantity: amount,
    // });
  } catch (err) {
    return status(500).json(err);
  }

  ctx.log.info('Finishing registerPayment');
  return status(204);
};
