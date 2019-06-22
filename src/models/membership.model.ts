import { CHAR, DOUBLE, INTEGER, Model, Sequelize, STRING } from 'sequelize';

export interface MembershipAttributes {
  name: string;
  price: number;
  duration: number;
  durationTimeUnit: number;
}

export class Membership extends Model {}

export default (sequelize: Sequelize) => {
  Membership.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: INTEGER,
      },
      name: {
        unique: true,
        allowNull: false,
        validate: {
          is: /[A-Za-z0-9\s]+/,
          notEmpty: true,
        },
        type: STRING,
      },
      price: {
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
        type: DOUBLE,
      },
      duration: {
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
        type: INTEGER,
      },
      durationTimeUnit: {
        allowNull: false,
        validate: {
          isIn: [['Y', 'M', 'W', 'D']],
          notEmpty: true,
        },
        type: CHAR,
        field: 'duration_time_unit',
      },
    },
    { sequelize, tableName: 'membership' }
  );

  return Membership;
};
