import { Block } from "../../core";
import { IChatMessage, IUser } from "../../types";
import DefaultAvatar from "../../assets/icons/default-avatar.svg";
import SettingIcon from "../../assets/icons/setting.svg";
import AddFileIcon from "../../assets/icons/add-file.svg";
import SendMessage from "../../assets/icons/send-message.svg";
import { EmptyCurrentChat, Message } from "..";
import { validateMessage } from "../../utils";

interface ISelectedCurrentChatProps {
  messageList?: IChatMessage[];
  currentUser: IUser;
  onBlurMessage?: () => void;
  message?: string;
  onClickSend?: () => void;
}

export class SelectedCurrentChat extends Block {
  constructor(props: ISelectedCurrentChatProps) {
    props.onBlurMessage= () => this.validate();
    props.onClickSend = () => {
      const valueMessage = this.valueMessage();
      if (!validateMessage(valueMessage)) {
        console.log('Сообщение:' + valueMessage);
      }
      else {
        console.log('Ошибка! Сообщение не может быть отправлено')
      }
    }
    super(props);
  }

  renderMessages(messages?: IChatMessage[]) {
    return messages?.map((message) => {
      const messageBlock = new Message({ message: message, myMessage: !!message?.main }).transformToString();
      return messageBlock
    })?.join("") ?? "";
  }


  public valueMessage() {
    if (!this.validate()) {
        return '';
    }
    return this.refs?.message.value()
  }

  private validate() {
    const value = this.refs?.message.value();
    const error = validateMessage(value);

    if (error) {
      this.setProps({ message: value });
      return false;
    }
    this.setProps({ message: value });
    return true;
}

  protected render(): string {
    const { currentUser, messageList = [], message = "" } = this.props as ISelectedCurrentChatProps;
    const { avatar, display_name } = currentUser;
    const emptyChats = new EmptyCurrentChat({ title: "Выберите чат, чтобы отправить сообщение" }).transformToString();
    return messageList?.length ? `
        <div class="current-chat-selected">
          <div class="current-chat-header">
            <div class="current-chat-header-image">
              <img src="${avatar ?? DefaultAvatar}" class="current-chat-header-icon" alt="Фото пользователя.">
            </div>
            <div class="current-chat-name">
              ${display_name ?? ""}
            </div>
            <div class="chat-settings">
              <img src="${SettingIcon}" class="chat-settings-icon" alt="Настройка чата.">
            </div>
          </div>
          <div class="current-chat-main">
            <div class='current-chat-messages-container'>
              ${this.renderMessages(messageList)}
            </div>
          </div>
          <footer class="current-chat-footer">
            <div>
              <button class="add-file-button" type="button">
                <img src="${AddFileIcon}" alt="Прикрепить дополнения." />
              </button>
            </div>
            <div class="message-input-block">
              {{{ InputField
                  placeholder="Сообщение"
                  inputContainerClassName="message-input-container"
                  inputClassName="message-input"
                  name="message"
                  ref="message"
                  onBlur=onBlurMessage
                  value="${message}"
              }}}
            </div>
            {{{ ButtonIcon className="send-button" icon="${SendMessage}" onClick=onClickSend }}}
          </footer>
        </div>
    ` : `${emptyChats}`
  }
}
