import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'test',
  modelName: 'Test',
})
export default class Test extends Model<Test> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.NUMBER)
  id: number;
}
