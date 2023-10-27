/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApi } from "../api";
import { BASE_URLS } from "../config";
import { Router } from "../core";
import { IAuthData, IUser } from "../types";
import { responseHasError } from "../utils";
import { initialStateApp, setStateUser } from "./app";

const authApi = new AuthApi('/auth');

export const getUser = async () => {
    const result = await authApi.getAuthUser();
    const error = responseHasError(result);
    if (error) throw Error(error);
    if (!error) {
        return result?.data || null;
    }

}

export const signUp = async (data: IUser) => {
    try {
        const result = await authApi.signUp(data);
        const error = responseHasError(result);
        if (error) {
            throw Error(error);
        }
        if (!error) {
            const newUser = await getUser() as IUser;
            setStateUser(newUser);
        }
        return result.data;
    } catch (error) {
        console.error(error);
    }
};

export const signIn = async (data: IAuthData) => {
    try {
        const result = await authApi.signIn(data);
        const error = responseHasError(result);
        if (error) {
            throw Error(error);
        }
        if (!error) {
            await initialStateApp();
        }
    } catch (error) {
        console.error(error);
    }
};


export const logOut = async () => {
    const result = await authApi.logOut();
    const error = responseHasError(result);
    if (error) {
        throw Error(error);
    }
    setStateUser(null);
    Router.getRouter().go(BASE_URLS.login);
};
