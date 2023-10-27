import { getUser } from ".";
import { BASE_URLS } from "../config";
import { Router } from "../core";
import { IChat, IUser } from "../types";
import { getChatToken, getChatUsers, getChats } from "./chat";
import { openConnectMessages } from "./sendMessage";

export const initialStateApp = async () => {
    const store = window.store.getState();
    let user = null;
    try {
        user = await getUser();
        if (user) {
            Router.getRouter().go(BASE_URLS.chats);
        }
    } catch (error) {
        if (Router.getRouter().currentRoute !== BASE_URLS.registration) Router.getRouter().go(BASE_URLS.login);
        setStateUser(null);
        return;
    }
    store.user = user as IUser;
    await updateChats();
};

export const updateChats = async () => {
    let chats: IChat[] = [];
    try {
        chats = await getChats();
    } catch (error) {
        setStateChats(chats)
    }
    setStateChats(chats)
};

export const initChatUsers = async (chat: IChat | null) => {
    if (!chat) return;
    let users: IUser[] = [];
    try {
        users = await getChatUsers(String(chat.id));
    } catch (error) {
        setStateUsers(chat, [])
    }
    setStateUsers(chat, users)
};

export const initChatToken = async (chat: IChat | null) => {
    if (!chat) return;
    let token = '';
    try {
        token = await getChatToken(String(chat.id));
    } catch (error) {
        setStateToken(chat, token)
    }
    setStateToken(chat, token)
};

export const setStateUser = (user?: IUser | null) => {
    window.store.set({ user: user });
};

export const setStateChats = (chats: IChat[]) => {
    window.store.set({ chats: chats });
};

export const setStateUsers = (chat: IChat, users: IUser[]) => {
    chat.users = [...users];
};

export const setStateToken = (chat: IChat, token: string) => {
    chat.token = token;
};

export const setStateCurrentChat = async (chat: IChat | null) => {
    await initChatUsers(chat);
    await initChatToken(chat);
    const user = window.store.getState().user;
    if (chat && user) {
        const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id);
        if (foundedChat && chat.connection) {
            foundedChat.unread_count = 0;
        }
        openConnectMessages(chat, user);

    }
    window.store.set({ currentChat: chat, chats: window.store.getState().chats });
};
