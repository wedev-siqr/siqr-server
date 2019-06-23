import { post } from 'server/router';
import { login } from '../controllers/authentication.controller';

export const authenticationRoutes = [post('/authentication/login', login)];
