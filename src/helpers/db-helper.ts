import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) throw env.error;

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
  define: {
    charset: 'utf-8',
    timestamps: false,
  },
});

export default sequelize;
