import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Specializations,
  User
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'appointments_control'
})
export class AppointmentsControl extends Model {

    @Column
    day: string;

    @BelongsTo(() => User, 'doctor_id')
    doctor: User;

    @BelongsTo(() => Specializations, 'specialization_id')
    specialization: Specializations;

    @Column
    specialization_id: number;

    @Column
    quotes_available: number;

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