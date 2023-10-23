import { setStateCurrentChat, updateChats } from "./app";
import { ChatApi } from "../api";
import { IChat, IChatUsersData, IUser } from "../types";
import { responseHasError } from "../utils";

const chatApi = new ChatApi('/chats');

export const getChats = async () => {
    const result = await chatApi.getChats();
    responseHasError(result);
    return result.data as IChat[];
};

export const createChat = async (title: string) => {
    const result = await chatApi.createChat(title);
    const error = responseHasError(result);
    if (error) {
        throw Error(error);
    }
    return result.data as IChat;
};

export const addChatUser = async (data: IChatUsersData) => {
    const result = await chatApi.addChatUsers(data);
    const error = responseHasError(result);
    if (error) throw Error(error);
    await updateChats();
};

export const deleteChatUsers = async (data: IChatUsersData) => {
    const result = await chatApi.deleteChatUsers(data);
    const error = responseHasError(result);
    if (error) throw Error(error);
    await updateChats();
};

export const getChatUsers = async (idChat: string) => {
    const result = await chatApi.getChatUsers(idChat);
    const error = responseHasError(result);
    if (error) throw Error(error);
    return result.data as IUser[];
};

export const getChatToken = async (idChat: string): Promise<string> => {
    const result = await chatApi.getChatToken(idChat);
    const error = responseHasError(result);
    if (error) throw Error(error);
    return (result.data as { token: string }).token;
};

export const updateChatAvatar = async (newAvatar: FormData,chatId:number) => {
    const result = await chatApi.updateChatAvatar(newAvatar,chatId);
    const error = responseHasError(result);
    if (error) throw Error(error);
    await setStateCurrentChat(result.data as IChat);
    return result.data as IChat;
}
