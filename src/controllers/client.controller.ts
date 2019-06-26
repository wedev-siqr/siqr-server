import { status } from 'server/reply';
import { Context } from 'server/typings/common';
import {
  Client,
  Direction,
  EmergencyContact,
  MedicalData,
  Membership,
  Payment,
} from '../models';
import { upload } from '../helpers/cloudinary-helper';
import sequelize from '../helpers/db-helper';
const uuid = require('uuid/v1');
import * as moment from 'moment';

export const getClients = async (ctx: Context) => {
  ctx.log.info('Starting getClients');
  try {
    const searchFilters = ctx.req.query;

    const clients = await Client.findAll({
      where: searchFilters,
      order: ['id'],
    });

    ctx.log.info('Finishing getClients');
    return status(200).json(clients);
  } catch (error) {
    ctx.log.error('Finishing getClients with errors');
    return status(409).json(error);
  }
};

export const getClientById = async (ctx: Context) => {
  ctx.log.info('Starting getClientId');
  const clientId = ctx.params.id;

  try {
    ctx.log.info('Get client');
    const client: any = await Client.findByPk(clientId);

    ctx.log.info('Get direction');
    const direction: any = await Direction.findByPk(client.directionId);

    ctx.log.info('Get medicalData');
    const medicalInfo: any = await MedicalData.findByPk(client.medicalDataId);

    ctx.log.info('Get emergencyContact');
    const emergencyContact: any = await EmergencyContact.findOne({
      where: {
        medical_data_id: medicalInfo.id,
      },
    });

    ctx.log.info('Get membership');
    const membership = await Membership.findByPk(client.membershipId);

    ctx.log.info('Finishing getClientId');
    return status(200).json({
      client,
      direction,
      medicalInfo,
      emergencyContact,
      membership,
    });
  } catch (error) {
    return status(500).json(error);
  }
};

export const getClientByCode = async (ctx: Context) => {
  const { code } = ctx.req.query;
  ctx.log.info('Getting client: %d', code);
  const client: any = await Client.findOne({
    where: { code: code },
    attributes: {
      include: [
        'id',
        'name',
        'first_surname',
        'second_surname',
        'membership_id',
        'register_date',
      ],
    },
  });
  ctx.log.info('Getting membership');
  const membership: any = await Membership.findByPk(client.membershipId);
  ctx.log.info('Getting payments');
  const payments = await Payment.findAll({
    where: {
      client_id: client.id,
    },
    order: [['date', 'DESC']],
  });

  const [lastPayment]: any = payments;

  const timeUnit =
    membership.durationTimeUnit != 'M'
      ? membership.durationTimeUnit.toLowerCase()
      : membership.durationTimeUnit;

  const expireDate = lastPayment
    ? moment(lastPayment.date).add(membership.duration, timeUnit)
    : moment(client.registerDate).add(membership.duration, timeUnit);
  ctx.log.info('Finishing getCllientByCode');
  return status(200).json({
    id: client.id,
    name: client.name,
    firstSurname: client.firstSurname,
    secondSurname: client.secondSurname,
    membership: membership.name,
    price: membership.price,
    expireDate,
  });
};

export const createClient = async (ctx: Context) => {
  ctx.log.info('Starting createClient');
  const payload = ctx.req.body;

  if (!payload.address)
    return status(400).json({
      message: 'Address field is required.',
    });

  if (!payload.medicalInfo)
    return status(400).json({
      message: 'Medical data field is required.',
    });

  if (!payload.photo)
    return status(400).json({
      message: 'Photo field is required.',
    });

  if (!payload.info)
    return status(400).json({
      message: 'Client info field is required.',
    });

  ctx.log.info('Starting transaction');
  const transaction = await sequelize.transaction();

  try {
    ctx.log.info('Creating direction');
    const direction: any = await Direction.create(payload.address, {
      transaction,
    });
    ctx.log.info('Direction created with id: %d', direction.id);

    ctx.log.info('Creating medical data');
    const medicalData: any = await MedicalData.create(payload.medicalInfo, {
      transaction,
    });
    ctx.log.info('Created medical data with id: %d', medicalData.id);

    ctx.log.info('Creating emegency contact');
    await EmergencyContact.create(
      { ...payload.emergencyContact, medical_data_id: medicalData.id },
      { transaction }
    );
    ctx.log.info('Created emegency contact');

    ctx.log.info('Uploading photo');
    const code = new Date().getTime();
    const uploadResponse: any = await upload(payload.photo.photo, code);
    ctx.log.info('Uploaded photo');

    ctx.log.info('Creating client');

    const clientPayload = {
      ...payload.info,
      directionId: direction.id,
      medicalDataId: medicalData.id,
      membershipId: payload.info.membership,
      photoUrl: uploadResponse.url,
      registerDate: new Date(),
      code,
    };
    await Client.create(clientPayload, { transaction });
    ctx.log.info('Created client');

    ctx.log.info('Commiting transaction');
    transaction.commit();

    ctx.log.info('Finishing createClient');
    return status(200).json({ code });
  } catch (error) {
    ctx.log.error('Rollingback transaction');
    transaction.rollback();

    ctx.log.error('Finishing createClient with error: %j', error);
    return status(500).json(error);
  }
};

export const updateClient = async (ctx: Context) => {
  const id = ctx.params.id;
  const payload = ctx.req.body;

  ctx.log.info('Get client');
  const client: any = await Client.findByPk(payload.info.id);

  ctx.log.info('Update direction');
  await Direction.update(payload.address, {
    where: {
      id: client.directionId,
    },
  });

  ctx.log.info('Update Medicaldata');
  await MedicalData.update(payload.medicalInfo, {
    where: {
      id: client.medicalDataId,
    },
  });

  ctx.log.info('Get medical data');
  const md: any = await MedicalData.findByPk(client.medicalDataId);

  ctx.log.info('Update contact');
  await EmergencyContact.update(payload.emergencyContact, {
    where: {
      medical_data_id: md.id,
    },
  });

  ctx.log.info('Upload photo');
  const { url }: any = await upload(payload.photo.photo, client.code);

  ctx.log.info('Update client');
  await Client.update(
    { ...payload.info, photoUrl: url },
    {
      where: { id },
    }
  );

  return status(204);
};

export const deleteClient = async (ctx: Context) => {
  ctx.log.info('Starting deleteClient');
  const clientId = ctx.params.id;

  try {
    ctx.log.info('Find client with id: %d', clientId);
    const client = await Client.findByPk(clientId);
    if (!client) {
      ctx.log.error("Client with id %d doesn't exist.", clientId);
      return status(404).json({
        message: `Client with id ${clientId} doesn't exist.`,
      });
    }

    ctx.log.info('Deleting client with id: %d', clientId);
    client.destroy();

    ctx.log.info('Finishing deleteClient.');
    return status(204);
  } catch (error) {
    ctx.log.error('Finishing deleteClient with errors.');
    return status(409).json(error);
  }
};

export const getQRCode = async (ctx: Context) => {
  const clientId = ctx.params.id;
  const client: any = await Client.findByPk(clientId);
  return status(200).json({
    code: client.code,
    name: `${client.name} ${client.firstSurname} ${client.secondSurname}`,
  });
};
