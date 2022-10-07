import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    Payments,
    User
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'cash_movements_type'
})
export class CashMovementsType extends Model {

    @Column
    name: string;

    @Column
    code: string;

    @Column
    averague: number;

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