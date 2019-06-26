import { post } from 'server/router';
import { accessWithCode } from 'src/controllers/access.controller';

export const authenticationRoutes = [post('/access', accessWithCode)];
