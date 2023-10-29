import { BASE_RESOURCES_URL } from "../../config";
import Block from "../../core/Block";
import { IChatMessage } from "../../types/IChatMessage";
import { IProps } from "../../types/IProps";
import { getShortDate } from "../../utils/date";

export interface IMessageProps {
    message: IChatMessage;
    myMessage: boolean;
    userName: string;
}

export class Message extends Block<IMessageProps> {
    constructor(props: IProps<IMessageProps>) {
        super({ ...props });
    }
    
    public renderForList = this.render;

    protected render(): string {
        const { message, myMessage, userName } = this.props;
        return `
            <li class="message  ${myMessage?' message-my':''}">
                ${message.file?`
                    <article class="message-file">
                        ${!myMessage ? ` <div class="message-user">${userName}</div>`: ''}
                        <img src=${BASE_RESOURCES_URL + message.file.path} alt="Вложенный файл"/>
                        <div class="message-time">
                            {{{ Badge text="${getShortDate(message.time)}" type="primary" }}}
                        </div>
                    </article>`:`<article class="message-text">
                        ${!myMessage ? ` <div class="message-user">${userName}</div>`: ''}
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
