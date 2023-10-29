import Block from "../../core/Block";

export class ViewProfile extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `{{{ ProfileLayout content="{{{ ViewProfileContent }}}" editAvatar=false }}}`
  }
}
