import { CHAR, DATE, INTEGER, Model, Sequelize, STRING } from 'sequelize';
import { CURP_REGEX, NAME_REGEX, PHONE_REGEX } from 'src/constants/regex';

export interface ClientAttributes {
  id?: number;
  name: string;
  firstSurname: string;
  secondSurname: string;
  birthdate: Date;
  gender: string;
  email?: string;
  curp: string;
  phone?: string;
  photoUrl: string;
  registerDate: Date;
  code: string;
  directionId: number;
  medicDataId: number;
  membership: number | string;
}

export class Client extends Model {}

export default (sequelize: Sequelize) => {
  Client.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        type: INTEGER,
      },
      name: {
        allowNull: false,
        type: STRING,
        validate: {
          notEmpty: true,
          is: NAME_REGEX,
        },
      },
      firstSurname: {
        allowNull: false,
        type: STRING,
        field: 'first_surname',
        validate: {
          notEmpty: true,
          is: NAME_REGEX,
        },
      },
      secondSurname: {
        allowNull: false,
        type: STRING,
        field: 'second_surname',
        validate: {
          notEmpty: true,
          is: NAME_REGEX,
        },
      },
      birthdate: {
        allowNull: false,
        type: DATE,
        validate: {
          notNull: true,
        },
      },
      gender: {
        allowNull: false,
        type: CHAR,
        validate: {
          notEmpty: true,
          isIn: [['H', 'M']],
        },
      },
      email: {
        type: STRING,
      },
      curp: {
        allowNull: false,
        type: STRING,
        validate: {
          notEmpty: true,
          is: CURP_REGEX,
        },
      },
      phone: {
        type: STRING,
      },
      photoUrl: {
        allowNull: false,
        type: STRING,
        field: 'photo_url',
        validate: {
          notEmpty: true,
        },
      },
      registerDate: {
        allowNull: false,
        type: DATE,
        field: 'register_date',
        validate: {
          notNull: true,
        },
      },
      code: {
        allowNull: false,
        type: STRING,
        validate: {
          notEmpty: true,
        },
      },
      directionId: {
        allowNull: false,
        type: INTEGER,
        field: 'direction_id',
        validate: {
          notNull: true,
          isInt: true,
        },
      },
      medicalDataId: {
        allowNull: false,
        type: INTEGER,
        field: 'medical_data_id',
        validate: {
          notNull: true,
          isInt: true,
        },
      },
      membershipId: {
        allowNull: false,
        type: INTEGER,
        field: 'membership_id',
        validate: {
          notNull: true,
          isInt: true,
        },
      },
    },
    { sequelize, tableName: 'client' }
  );
  return Client;
};
