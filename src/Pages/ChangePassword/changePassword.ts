import Block from "../../core/Block";

export class ChangePassword extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `{{{ ProfileLayout content="{{{ ChangePasswordContent }}}" }}}`
  }
}
