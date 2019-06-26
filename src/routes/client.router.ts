import { post, get, put, del } from 'server/router';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getQRCode,
  getClientByCode,
} from '../controllers/client.controller';

export const clientRouter = [
  get('/clients', getClients),
  get('/clients/code', getClientByCode),
  get('/clients/:id', getClientById),
  get('/clients/:id/code', getQRCode),
  post('/clients', createClient),
  put('/clients/:id', updateClient),
  del('/clients/:id', deleteClient),
];
