import { home, index } from '../controllers/test.controller';
import { get } from 'server/router';

export const testRoutes = [get('/test', index), get('/test/home', home)];
