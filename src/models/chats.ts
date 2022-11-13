import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  User,
  ChatSession
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'chats'
})
export class Chats extends Model {

  @BelongsTo(() => ChatSession, 'chat_session_id')
  chat_session: ChatSession;

  @BelongsTo(() => User, 'sender_id')
  sender: User;

  @Column
  message: string;

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