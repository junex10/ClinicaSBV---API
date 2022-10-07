import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    EventsType
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'events'
})
export class Events extends Model {

    @Column
    name: string;

    @Column
    title: string;

    @Column
    description: string;

    @BelongsTo(() => EventsType, 'event_type_id')
    event_type: EventsType;

    @Column
    repeat: number;

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