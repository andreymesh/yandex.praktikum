import * as Components from "./Components";
import * as Pages from "./Pages";
import { BASE_URLS } from "./config";
import { Block, Router, Store, registerComponent } from "./core";
import { initialStateApp } from "./services";
import { IAppState } from "./types";

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component as typeof Block)
});


const initState: IAppState = {
  error: null,
  user: undefined,
  currentChat: null,
  chats: [],
}

window.store = new Store(initState);

const router = new Router(".app");
initialStateApp();

router
  .use(BASE_URLS.login, Pages.Login as typeof Block)
  .use(BASE_URLS.registration, Pages.Registration)
  .use(BASE_URLS.viewProfile, Pages.ViewProfile)
  .use(BASE_URLS.editProfileData, Pages.EditProfile)
  .use(BASE_URLS.editProfilePassword, Pages.ChangePassword)
  .use(BASE_URLS.notFound, Pages.Error404)
  .use(BASE_URLS.internalServerError, Pages.Error500)
  .use(BASE_URLS.chats, Pages.Chat)
  .start();    
