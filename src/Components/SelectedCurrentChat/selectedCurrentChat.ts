import { Block, IProps, StoreEvents } from "../../core";
import { IChat, IChatMessage } from "../../types";
import { Message } from "..";
import { getUserName } from "../../utils";

interface ISelectedCurrentChatProps {
  messageList?: IChatMessage[];
  onBlurMessage?: () => void;
  message?: string;
  onClickSend?: () => void;
  currentChat?: IChat | null;
}

export class SelectedCurrentChat extends Block<ISelectedCurrentChatProps> {
  constructor(props: IProps<ISelectedCurrentChatProps>) {
    props.currentChat = window.store.getState().currentChat;
    props.messageList = window.store.getState().currentChat?.messages || [];
    super({ ...props });

    window.store.on(StoreEvents.Updated, () => {
      this.props.messageList = window.store.getState().currentChat?.messages || [];
      this.props.currentChat = window.store.getState().currentChat;
      this.setProps(this.props);
    });
  }

  renderMessages() {
    const { messageList, currentChat } = this.props;
    const users = currentChat?.users;
    const mapUsers = new Map();
    if (users) {
        users.forEach(user => mapUsers.set(user.id, getUserName(user)));
    }
    if (!messageList?.length) return '';
    return messageList.map(message => {
      const messageBlock = new Message({
        userName: mapUsers.size ? mapUsers.get(message.user_id) : '',
        message: message,
        myMessage: String(message.user_id) === String(this.props.currentUser?.id)
      })
      return (`
        <div class="current-chat-messages-container">
          ${messageBlock.renderForList()}
        </div>
      `)
    }).join('');
  }

  protected render(): string {
    const { currentChat } = this.props;
    if (!currentChat) {
      return `{{{EmptyCurrentChat title="Выберите чат, чтобы отправить сообщение"}}}`;
    }
    const users = currentChat.users?.length || 0;
    return `
        <div class="current-chat-selected">
          {{{ ChatHeader }}}
          ${users > 1 ?
            `<ul class="current-chat-main">
              ${this.renderMessages()}      
              <li class="scroll-bottom"></li>           
            </ul>  
            {{{ CurrentChatFooter }}}`
          :`<div class="chat-empty">
              <p>Добавьте пользователей в чат</p>
            </div>`
        }
        </div>
        `
  }
}
