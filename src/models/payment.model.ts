import { Model, Sequelize, INTEGER, DATE, DOUBLE } from 'sequelize';

export interface PaymentAttributes {
  date: Date;
  quantity: number;
  clientId: number;
}

export class Payment extends Model {}

export default (sequelize: Sequelize) => {
  Payment.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        type: INTEGER,
      },
      date: {
        allowNull: false,
        type: DATE,
        validate: {
          notNull: true,
        },
      },
      quantity: {
        allowNull: false,
        type: DOUBLE,
        validate: {
          min: 0,
        },
      },
    },
    { sequelize, tableName: 'payment' }
  );
  return Payment;
};
