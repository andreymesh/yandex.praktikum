import { Block } from "../../core";

export class Chat extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `<main class="chat">
              <div class="chat-container">
                {{{ ChatList }}}
                {{{ SelectedCurrentChat }}}
              </div>
            </main>
    `
  }
}
