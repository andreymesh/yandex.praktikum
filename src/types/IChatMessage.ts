import { IFile } from "./IFile";

export interface IChatMessage {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string | 'message' | 'file';
  content: number | string;
  file?: IFile;
  main?: boolean;
  is_read?: boolean;
}
