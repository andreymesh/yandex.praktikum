import Handlebars from "handlebars";
import DefaultAvatar from "./assets/icons/default-avatar.svg";
import Setting from "./assets/icons/setting.svg";
import AddFile from "./assets/icons/add-file.svg";
import SendMessage from "./assets/icons/send-message.svg";
import BackIcon from "./assets/icons/return.svg";
import * as Components from "./Components";
import * as Pages from "./Pages";

const date = new Date();
const messageTime = date.getHours() + ':' + date.getMinutes();

const chatItems = [
  { avatar: DefaultAvatar, title: "1", last_message: "Привет", time: messageTime },
  { avatar: DefaultAvatar, title: "2", last_message: "Привет", time: messageTime },
  { avatar: DefaultAvatar, title: "3", last_message: "Привет", time: messageTime, unread_count: 3 },
];

const pages: Record<string, any> = {
  "login": [Pages.Login],
  "registration": [Pages.Registration],
  "error-404": [Pages.Error404],
  "error-500": [Pages.Error500],
  "view-profile": [Pages.ViewProfile, { userName: "Андрей", avatarSrc: DefaultAvatar, buttonIconPage: "chat", buttonIcon: BackIcon }],
  "edit-profile": [Pages.EditProfile, { userName: "Андрей", avatarSrc: DefaultAvatar, page: "view-profile", buttonIconPage: "view-profile", buttonIcon: BackIcon }],
  "change-password": [Pages.ChangePassword, { userName: "Андрей", avatarSrc: DefaultAvatar, page: "view-profile", buttonIconPage: "view-profile" }],
  "chat": [Pages.Chat, { chatItems }],
  "selected-chat": [Pages.Chat, {
    chatItems,
    isChatSelected: true,
    avatarIcon: DefaultAvatar,
    chatTitle: "Андрей",
    chatSettingsIcon: Setting,
    addFileIcon: AddFile,
    buttonIcon: SendMessage
  }]
};


Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("click", e => {
  const element = e?.target as Element
  const page = element?.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
