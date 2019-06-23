import sequelize from '../helpers/db-helper';
import clientModel from './client.model';
import directionModel from './direction.model';
import emergencyContactModel from './emergency-contact.model';
import medicalDataModel from './medical-data.model';
import membershipModel from './membership.model';
import paymentModel from './payment.model';

export { ClientAttributes } from './client.model';
export { DirectionAttributes } from './direction.model';
export { EmergencyContactAttributes } from './emergency-contact.model';
export { MedicalDataAttributes } from './medical-data.model';
export { MembershipAttributes } from './membership.model';
export { PaymentAttributes } from './payment.model';

export const Client = clientModel(sequelize);
export const Direction = directionModel(sequelize);
export const Membership = membershipModel(sequelize);
export const MedicalData = medicalDataModel(sequelize);
export const EmergencyContact = emergencyContactModel(sequelize);
export const Payment = paymentModel(sequelize);

EmergencyContact.belongsTo(MedicalData, {
  foreignKey: 'medical_data_id',
  as: 'emergencyContact',
  constraints: false,
});

Client.belongsTo(MedicalData, {
  foreignKey: 'medical_data_id',
  as: 'medicalData',
});

Client.belongsTo(Direction, {
  foreignKey: 'direction_id',
  as: 'direction',
});

Client.belongsTo(Membership, {
  foreignKey: 'membership_id',
  as: 'membership',
});

Payment.belongsTo(Client, {
  foreignKey: 'client_id',
  as: 'client',
});
