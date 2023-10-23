import { Block } from "../../core"

export class ChangePassword extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `{{{ ProfileLayout content="{{{ ChangePasswordContent }}}" }}}`
  }
}
