import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'events_type'
})
export class EventsType extends Model {

    @Column
    color: string;

    @Column
    name: string;

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