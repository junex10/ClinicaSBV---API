import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, HasMany } from "sequelize-typescript";
import {
  Chats
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'attachments_chats'
})
export class AttachmentsChats extends Model {

  @BelongsTo(() => Chats, 'chat_id')
  chat: Chats;

  @Column
  attachment: string;

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