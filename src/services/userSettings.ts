import { setStateUser } from ".";
import { UserSettingsApi } from "../api";
import { Router } from "../core";
import { IPasswords, IUser } from "../types";
import { responseHasError } from "../utils";

const userApi = new UserSettingsApi('/user');

export const updateUserProfile = async (newUserData: IUser) => {
  const result = await userApi.changeUserProfile(newUserData);
  const error = responseHasError(result);
  if (error) {
    throw Error(error);
  }
  if (!error) {
    setStateUser(result.data as IUser);
    Router.getRouter().back();
  }
};

export const updateUserPassword = async (newUserPasswords: IPasswords) => {
  const result = await userApi.changeUserPassword(newUserPasswords);
  const error = responseHasError(result);
  if (error) {
    throw Error(error);
  }
  Router.getRouter().back();
};

export const updateUserAvatar = async (newAvatar: FormData) => {
  const result = await userApi.changeUserAvatar(newAvatar);
  const error = responseHasError(result);
  if (error) {
    throw Error(error);
  }
  setStateUser(result.data as IUser);
  return result.data as IUser;
};

export const searchUsersByLogin = async (login: string) => {
  const result = await userApi.searchUser(login);
  const error = responseHasError(result);
  if (error) throw Error(error);
  return result.data as IUser[];
};
