import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    User,
    PaymentsType
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'payments'
})
export class Payments extends Model {

    @BelongsTo(() => User, 'user_id')
    user: User;

    @BelongsTo(() => PaymentsType, 'payment_type_id')
    payment_type: PaymentsType;

    @Column
    references: string;

    @Column
    amount: string;

    @Column
    attachment: string;

    @Column
    verified: number;

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