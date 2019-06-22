import { post } from 'server/router';
import { login } from 'src/controllers/authentication.controller';

export const authenticationRoutes = [post('/authentication/login', login)];
