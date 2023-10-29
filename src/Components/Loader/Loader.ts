import Block from "../../core/Block";

export class Loader extends Block {
  protected render(): string {
      return `<span class="loader"></span>`
  }
}
