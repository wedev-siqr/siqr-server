import { CHAR, INTEGER, Model, Sequelize, STRING, TEXT } from 'sequelize';

export interface MedicalDataAttributes {
  affiliation: string;
  affiliationName?: string;
  booldType: string;
  rh: string;
  alergies?: string;
  diseases?: string;
}

export class MedicalData extends Model {}

export default (sequelize: Sequelize) => {
  MedicalData.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: INTEGER,
      },
      affiliation: {
        allowNull: false,
        type: STRING,
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
        },
      },
      affiliationName: {
        type: STRING,
        field: 'affiliation_name',
      },
      bloodType: {
        allowNull: false,
        type: CHAR(2),
        field: 'blood_type',
        validate: {
          notEmpty: true,
          is: /[A-Za-z0-9\s]+/,
          isIn: [['A', 'B', 'AB', 'O']],
        },
      },
      rh: {
        allowNull: false,
        validate: {
          isIn: [['P', 'N']],
          notEmpty: true,
        },
        type: CHAR(1),
      },
      alergies: {
        type: TEXT,
      },
      diseases: {
        type: TEXT,
      },
    },
    { sequelize, tableName: 'medical_data' }
  );

  return MedicalData;
};
