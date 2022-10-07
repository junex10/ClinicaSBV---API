import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'specializations'
})
export class Specializations extends Model {

    @Column
    code: string;

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