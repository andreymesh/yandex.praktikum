import { IChat } from "./IChat";
import { IUser } from "./IUser";

export interface IAppState {
    error?: string | null;
    user?: IUser | null;
    chats: IChat[];
    currentChat?: IChat | null;
}
