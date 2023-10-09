import { Block } from "../../core";

export class ViewProfile extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `{{{ ProfileLayout userName="Андрей" content="{{{ ViewProfileContent }}}" page="chat" }}}`
  }
}
