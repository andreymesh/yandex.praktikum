import { Block } from "../../core"

export class Error500 extends Block {
  constructor() {
    super()
  }

  protected render(): string {
    return `{{{ Error code=500 title="Мы уже фиксим" }}}`
  }
}
