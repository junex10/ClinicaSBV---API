import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, DefaultScope } from "sequelize-typescript";
import {
  Process,
  User
} from '.';

@DefaultScope(() => ({
  include: [{
    model: Process
  }]
}))

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'petition'
})
export class Petition extends Model {

  @Column
  user_id: number;

  @Column
  process_id: number;

  @BelongsTo(() => Process, 'process_id')
  process: Process;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @DeletedAt
  @Column
  deleted_at: Date;
}