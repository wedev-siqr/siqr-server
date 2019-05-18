import { Sequelize } from 'sequelize-typescript';
import { routes } from './router';
import { Context } from 'server/typings/common';

const dotenv = require('dotenv');
const server = require('server');

const env = dotenv.config();

if (env.error) {
  throw env.error;
}

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
  modelPaths: [`${__dirname}/models`],
  define: {
    charset: 'utf-8',
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB stable.');
    server({}, routes)
      .then((ctx: Context) => {
        console.log('Server enabled on port: ', ctx.options.port);
      })
      .catch((err) => {
        console.error('Error starting server:', err);
      });
  })
  .catch((err) => {
    console.error('Error conectiong to DB:', err);
  });
