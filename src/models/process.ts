import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'process'
})
export class Process extends Model {

  @Column
  description: string;

  @Column
  link: string;

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