import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import {
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'person'
})
export class Person extends Model {

  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  user_id: number;

  @Column
  medical_history: number;

  @Column
  age: number;

  @Column
  birthdate: Date;

  @Column
  document: string;

  @Column
  phone: string;

  @Column
  address: string;

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