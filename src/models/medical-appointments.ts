import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    Payments,
    User
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'medical_appointments'
})
export class MedicalAppointments extends Model {

    @BelongsTo(() => User, 'patient_id')
    patient: User;

    @BelongsTo(() => Payments, 'payment_id')
    payment: Payments;

    @BelongsTo(() => User, 'doctor_id')
    doctor: User;

    @Column
    medical_reason: string;

    @Column
    medical_description: string;

    @Column
    date_cite: Date;

    @Column
    entry_date: Date;

    @Column
    amount: string;

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