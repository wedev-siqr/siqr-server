import { post, get, put, del } from 'server/router';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller';

export const clientRouter = [
  get('/clients', getClients),
  get('/clients/:id', getClientById),
  post('/clients', createClient),
  put('/clients/:id', updateClient),
  del('/clients/:id', deleteClient),
];
