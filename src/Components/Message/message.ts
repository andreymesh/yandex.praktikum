import Block  from "../../core/Block";
import { IChatMessage } from "../../types";

export interface IMessageProps {
  message: IChatMessage;
  myMessage: boolean;
}

export class Message extends Block {
  constructor(props: IMessageProps) {
      super(props);
  }

  protected render(): string {
    const { message, myMessage } = this.props;
    return `
        <li class="message  ${myMessage?' message-my':''}">
            ${message.file?`
                <article class="message-file">
                    <img src=${message.file.path} alt="Вложенный файл"/>
                    <div class="message-time">
                        {{{ Badge text="01.20" type="primary" }}}
                    </div>
                </article>`:`<article class="message-text">
                    <p>${message.content}</p>
                    <div class="message-time">
                        {{{ Badge text="01.20" }}}
                    </div>
                </article>`
            }
        </li>
    `
  }
}
