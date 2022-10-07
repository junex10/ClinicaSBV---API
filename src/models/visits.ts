import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'visits'
})
export class Visits extends Model {

    @Column
    visits: string;

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