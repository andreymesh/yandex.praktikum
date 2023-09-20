import { Block } from "../../core";

export class EditProfile extends Block {
  constructor() {
    super();
  }
  protected render(): string {
    return `{{{ ProfileLayout userName="Андрей" content="{{{ EditProfileContent }}}" page="view-profile" }}}`
  }
}
