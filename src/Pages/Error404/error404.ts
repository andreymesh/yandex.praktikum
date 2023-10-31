import Block from "../../core/Block"

export class Error404 extends Block {
  constructor() {
    super()
  }
  protected render(): string {
    return `{{{ Error code=404 title="Не туда попали" }}}`
  }
}
