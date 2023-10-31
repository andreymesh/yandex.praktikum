import Block from "../../core/Block";

export class EditProfile extends Block {
  constructor() {
    super();
  }
  protected render(): string {
    return `{{{ ProfileLayout content="{{{ EditProfileContent }}}" editAvatar=true }}}`
  }
}
