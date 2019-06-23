import { status } from 'server/reply';
import { Context } from 'server/typings/common';
import {
  Client,
  Direction,
  EmergencyContact,
  MedicalData,
  Membership,
} from '../models';
import { upload } from '../helpers/cloudinary-helper';
import sequelize from '../helpers/db-helper';
const uuid = require('uuid/v1');

export const getClients = async (ctx: Context) => {
  ctx.log.info('Starting getClients');
  try {
    const searchFilters = ctx.req.query;

    const clients = await Client.findAll({
      where: searchFilters,
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
    const uploadResponse: any = await upload(payload.photo.photo);
    ctx.log.info('Uploaded photo');

    ctx.log.info('Creating client');
    const code = uuid();
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
    return status(204).json({ code });
  } catch (error) {
    ctx.log.error('Rollingback transaction');
    transaction.rollback();

    ctx.log.error('Finishing createClient with error: %j', error);
    return status(500).json(error);
  }
};

export const updateClient = async (ctx: Context) => {
  return status(501);
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
