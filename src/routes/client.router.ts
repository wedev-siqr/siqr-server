import { post, get, put, del } from 'server/router';
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
  getClientById,
} from '@siqr/controllers/client.controller';

export const clientRouter = [
  get('/clients', getClients),
  get('/clients/:id', getClientById),
  post('/clients', createClient),
  put('/clients/:id', updateClient),
  del('/clients/:id', deleteClient),
];
