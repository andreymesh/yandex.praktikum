import { Block, IProps, StoreEvents } from "../../core";
import { IChat } from "../../types";
import { declension } from "../../utils";


interface IChatHeaderProps {
  currentChat?: IChat | null;
  openMenuMessage?: () => void;
  openMenuChat?: () => void;
  isOpenedMenuChat: boolean;
}

const declinePoints = declension("участник", "участника", "участников");

export class ChatHeader extends Block<IChatHeaderProps> {
  constructor(props: IProps<IChatHeaderProps>) {
    props.isOpenedMenuChat = false;
    props.currentChat = window.store.getState().currentChat;
    props.openMenuChat = () => {
      this.props.isOpenedMenuChat = !this.props.isOpenedMenuChat;
      this.props.currentChat = window.store.getState().currentChat;
      this.setProps(this.props);
    };
    super({ ...props });

    window.store.on(StoreEvents.Updated, () => {
        this.props.currentChat=window.store.getState().currentChat;
        this.setProps(this.props);
    });
  }
  protected render(): string {
    const { currentChat, isOpenedMenuChat } = this.props;
    const countUsers = currentChat?.users?.length || 1;
    if (!currentChat) {
      return "";
    }
    const { avatar, title } = currentChat;
    return `
    <div class="current-chat-header">
      <div class="current-chat-header-image">
        {{{ Avatar avatarSrc='${avatar || ''}' className="current-chat-header-icon" }}}
      </div>
      <div class="current-chat-name">
          <span>${title}</span>
          <p>${countUsers} ${declinePoints(countUsers)}</p>
      </div>
      <div class="chat-settings">
        {{{ Button type="dots" className="chat-settings-icon" onClick=openMenuChat }}}
        ${isOpenedMenuChat ? `{{{ MenuChat isOpenedMenu=${isOpenedMenuChat} closeMenu=openMenuChat}}}` : ""}
      </div>
    </div>
    `
  }
}
