import { get, post, del, put } from 'server/router';
import {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
  getMembershipById,
} from '../controllers/membership.controller';

export const membershipRouter = [
  get('/memberships', getMemberships),
  get('/memberships/:id', getMembershipById),
  post('/memberships', createMembership),
  put('/memberships/:id', updateMembership),
  del('/memberships/:id', deleteMembership),
];
