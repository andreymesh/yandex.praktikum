import { IPasswords } from "../types/IPasswords";
import { IUser } from "../types/IUser";
import { HTTPTransport } from "../utils/HTTPTransport";

export class UserSettingsApi {
    private httpTransport = new HTTPTransport();
    private readonly baseUrl: string | null = null;

    constructor(baseUrl?: string) {
      if (baseUrl) {
        this.baseUrl = baseUrl;
      }
    }

    public changeUserProfile(userData: IUser) {
      return this.httpTransport.put(this.baseUrl + '/profile', { data: userData });
    }

    public changeUserAvatar(file: FormData) {
      return this.httpTransport.put(this.baseUrl + '/profile/avatar', { data: file });
    }

    public changeUserPassword(data: IPasswords) {
      return this.httpTransport.put(this.baseUrl + '/password', { data: data });
    }

    public searchUser(login: string) {
      return this.httpTransport.post(this.baseUrl + '/search', { data: { login: login } });
  }
}
