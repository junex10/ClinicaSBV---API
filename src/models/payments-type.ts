import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'payments_type'
})
export class PaymentsType extends Model {

    @Column
    name: string;

    @Column
    status: number;

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