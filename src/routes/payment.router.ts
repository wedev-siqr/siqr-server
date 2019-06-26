import { get, post } from 'server/router';
import {
  getPayments,
  registerPayment,
} from 'src/controllers/payment.controller';

export const paymentRouter = [
  get('/payments', getPayments),
  post('/payments/:id', registerPayment),
];
