import Block from "../../core/Block";

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
