import { IChat, IUser } from ".";

export interface IAppState {
    error?: string | null;
    user?: IUser | null;
    chats: IChat[];
    currentChat?: IChat | null;
}
