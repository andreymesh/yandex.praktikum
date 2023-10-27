import { ModalPrompt } from "..";
import { BASE_URLS } from "../../config";
import { Block, IProps, StoreEvents, modalController } from "../../core";
import { createChat, setStateCurrentChat, updateChats } from "../../services";
import { IChat, IUser } from "../../types";

interface IChatListProps {
  chatList: IChat[];
  currentUser?: IUser | null;
  showModalAddChat: () => void;
  setCurrentChat: (chatId: string) => void;
}

export class ChatList extends Block<IChatListProps> {
  constructor(props: IProps<IChatListProps>) {
    props.currentUser = window.store.getState().user;
    props.chatList = window.store.getState().chats || [];
    props.showModalAddChat = () => {
      modalController.addModal(new ModalPrompt({
        caption: 'Добавить чат',
        labelText: 'Название чата',
        okText: 'Добавить чат',
        ref: "modal",
        okClick: (result: string) => {
          createChat(result)
            .then(async () => await updateChats())
            .catch((error) => console.warn(error));
        },
      }));
      modalController.openModal();
    };

    props.setCurrentChat = (id: string) => {
      const { chatList } = this.props;
      const chat = chatList?.find(item => item.id === Number.parseInt(id, 10)) || null;
      setStateCurrentChat(chat).then(() => {
        this.setProps(this.props);
      })
    };

    super(props);

    window.store.on(StoreEvents.Updated, () => {
      this.props.currentUser = window.store.getState().user || null;
      this.props.chatList = window.store.getState().chats || [];
      this.setProps(this.props);
    });
  }

  renderChats() {
    const { chatList } = this.props;
    return chatList?.map((chat) => {
      return `{{{ ChatItem
                    id='${chat.id}'
                    title='${chat.title}'
                    avatar='${chat?.avatar || ''}'
                    unread_count='${chat.unread_count > 0 ? String(chat.unread_count) : ''}'
                    last_message_content='${chat.last_message ? chat.last_message.content : 'no messages'} '
                    last_message_time='${chat.last_message ? chat.last_message.time : ''}'
                    onClick=setCurrentChat
              }}}`
    })?.join("") ?? "";
  }

  protected render(): string {
    const { currentUser } = this.props;
    if (!currentUser) {
      return `<div class="chat-list-area">
                <div class="login-container">
                  {{{ Loader }}}
                </div>
              </div>`;
    }
    return `<div class="chat-list-area">
              <div class="profile-link-block">
              {{{ Avatar avatarSrc="${currentUser?.avatar}" className="chat-list-avatar" }}}
              {{{ Button label="Новый чат" type="link" onClick=showModalAddChat }}}
              {{{ Link label="Профиль" link="${BASE_URLS.viewProfile}" className="profile-link-title"}}}
              </div>
              <div class="search-input-block">
                {{{ Input
                      placeholder="Поиск"
                      inputContainerClassName="search-input-container"
                      inputClassName="search-input"
                }}}
                <ul class="chat-list">
                  ${this.renderChats()}
                </ul>
              </div>
            </div>
    `
  }
}
