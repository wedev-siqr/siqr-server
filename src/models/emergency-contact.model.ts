import { INTEGER, Model, Sequelize, STRING } from 'sequelize';

export interface EmergencyContactAttributes {
  name: string;
  firstSurname: string;
  secondSurname: string;
  phone: string;
  medicalDataId: number;
}

export class EmergencyContact extends Model {}

export default (sequelize: Sequelize) => {
  EmergencyContact.init(
    {
      id: {
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: INTEGER,
      },
      name: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
      firstSurname: {
        allowNull: false,
        field: 'first_surname',
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
      secondSurname: {
        allowNull: false,
        field: 'second_surname',
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
        type: STRING,
      },
      phone: {
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /[0-9]{10}/,
        },
        type: STRING,
      },
    },
    { sequelize, tableName: 'emergency_contact' }
  );
  return EmergencyContact;
};
