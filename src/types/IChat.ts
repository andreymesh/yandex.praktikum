import { ILastMessage } from "./ILastMessage";

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: ILastMessage;
}
