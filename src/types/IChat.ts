import { IUser } from "./IUser";
import { ILastMessage } from "./ILastMessage";
import { IChatMessage } from "./IChatMessage";
import { SocketIO } from "../api";

export interface IChat {
  id: number;
  title: string;
  avatar?: string;
  token?: string;
  unread_count: number;
  created_by: number;
  last_message?: ILastMessage;
  users?: IUser[];
  connection?: SocketIO;
  messages?: IChatMessage[];
}
