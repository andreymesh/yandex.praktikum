import { IUser } from "./IUser";

export interface ILastMessage {
  user: IUser;
  time: string;
  content: string;
}
