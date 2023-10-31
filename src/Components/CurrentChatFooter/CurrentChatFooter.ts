import { IChatMessage } from "../../types/IChatMessage";
import { IUser } from "../../types/IUser";
import { IChat } from "../../types/IChat";
import { validateMessage } from "../../utils/validation";
import { showAlert } from "../../utils/showAlert";
import { sendMessage } from "../../services/sendMessage";
import Block from "../../core/Block";
import { IProps } from "../../types/IProps";


interface ICurrentChatFooterProps {
  messageList: IChatMessage[];
  currentUser: IUser;
  currentChat: IChat | null;
  onBlurMessage?: () => void;
  message?: string;
  onClickSend?: () => void;
  openMenuMessage?: () => void;
  openMenuChat?: () => void;
  isOpenedMenuMessage: boolean;
  isOpenedMenuChat: boolean;
}

export class CurrentChatFooter extends Block<ICurrentChatFooterProps> {
  constructor(props: IProps<ICurrentChatFooterProps>) {
    props.isOpenedMenuMessage = false;
    props.onClickSend = () => {
      if (!validateMessage(this.valueMessage())) {
        sendMessage(this.valueMessage());
      }
      else {
        showAlert("Ошибка! Сообщение не может быть отправлено");
      }
    };
    props.openMenuMessage = () => {
      this.props.isOpenedMenuMessage = !this.props.isOpenedMenuMessage;
      this.setProps(this.props);
    };
    props.events = {
      submit: (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('submit');
        if (this.props.onClickSend) {
          this.props.onClickSend();
        }
      }
    };
    super({...props});
  }

  public valueMessage() {
    return this.refs?.message.value();
  }

  protected render(): string {
    const { message = "", isOpenedMenuMessage } = this.props;
    return `
    <form class="current-chat-footer">
        {{{ MenuMessage isOpenedMenu=${isOpenedMenuMessage } closeMenu=openMenuMessage}}}
        {{{ Button type="paperclip" onClick=openMenuMessage}}}
        {{{ InputField
              placeholder="Сообщение"
              inputContainerClassName="message-input-container"
              inputClassName="message-input"
              name="message"
              ref="message"
              onBlur=onBlurMessage
              value="${message}"
        }}}
        {{{ Button type="arrow"  isSubmit=true}}}
    </form>`
  }
}
