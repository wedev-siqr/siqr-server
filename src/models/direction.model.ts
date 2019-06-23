import { Sequelize, Model, INTEGER, STRING } from 'sequelize';

export interface DirectionAttributes {
  street: string;
  externalNumber: string;
  internalNumber?: string;
  district: string;
  postalCode: string;
  municipality: string;
  state: string;
}

export class Direction extends Model {}

export default (sequelize: Sequelize) => {
  Direction.init(
    {
      id: {
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
      },
      street: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
      externalNumber: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
        field: 'external_number',
      },
      internalNumber: {
        validate: {
          // is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
        field: 'internal_number',
      },
      district: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
      postalCode: {
        allowNull: false,
        field: 'postal_code',
        validate: {
          notEmpty: true,
          is: /[0-9]{5}/,
        },
        type: STRING,
      },
      municipality: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
      state: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
    },
    { sequelize, tableName: 'direction' }
  );
  return Direction;
};
