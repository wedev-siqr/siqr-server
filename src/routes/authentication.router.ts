import { post } from 'server/router';
import { accessWithCode } from '../controllers/access.controller';

export const authenticationRoutes = [post('/access', accessWithCode)];
