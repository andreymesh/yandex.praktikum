import * as Components from "./Components";
import * as Pages from "./Pages";
import { Block, registerComponent } from "./core";

const pages: Record<string, unknown> = {
  "login": Pages.Login,
  "registration": Pages.Registration,
  "error-404": Pages.Error404,
  "error-500": Pages.Error500,
  "view-profile": Pages.ViewProfile,
  "edit-profile": Pages.EditProfile,
  "change-password": Pages.ChangePassword,
  "chat": Pages.Chat
};

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component as typeof Block)
});


function navigate(page: string) {
  const container = document.getElementById("app")!;
  const Component = pages[page] as unknown as typeof Block;
  const component = new Component();
  container?.replaceChildren();
  container?.append(component.getContent() as Node);
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
