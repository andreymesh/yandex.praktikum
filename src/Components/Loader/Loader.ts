import { Block } from "../../core";

export class Loader extends Block {
  protected render(): string {
      return `<span class="loader"></span>`
  }
}
