import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    CashMovementsType
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'money_movements'
})
export class MoneyMovements extends Model {

    @Column
    name: string;

    @Column
    averague: number;

    @BelongsTo(() => CashMovementsType, 'cash_movements_type_id')
    cash_movements_type: CashMovementsType;

    @Column
    type: number;

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