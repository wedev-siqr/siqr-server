// import {
//   Model,
//   Table,
//   PrimaryKey,
//   AutoIncrement,
//   Unique,
//   AllowNull,
//   Column,
//   DataType,
// } from 'sequelize-typescript';

// @Table({
//   modelName: 'User',
//   tableName: 'user',
// })
// export default class User extends Model<User> {
//   @PrimaryKey
//   @AutoIncrement
//   @Unique
//   @AllowNull(false)
//   @Column(DataType.INTEGER())
//   id: number;

//   @AllowNull(false)
//   @Unique
//   @Column(DataType.STRING({ length: 255 }))
//   username: string;

//   @AllowNull(false)
//   @Column(DataType.STRING({ length: 255 }))
//   password: string;

//   @Column(DataType.ARRAY({ type: DataType.STRING({ length: 255 }) }))
//   roles: string[];
// }
