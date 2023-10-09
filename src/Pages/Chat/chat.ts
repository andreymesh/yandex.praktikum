import { Block } from "../../core";
import { chats } from "../../mockData/chatsMockData";
import { messagesMockData } from "../../mockData/messagesMockData";
import { mockUser } from "../../mockData/userMockData";
import { IChat, IChatMessage, IUser } from "../../types";

interface IChatProps {
  chatList: IChat[];
  currentUser: IUser;
  messageList: IChatMessage[];
}

export class Chat extends Block {
  constructor() {
    const props: IChatProps = {
      currentUser: mockUser,
      chatList: [...chats],
      messageList: [... messagesMockData]
    }
    super(props);
  }

  protected render(): string {
    return `
    <main class="chat">
      <div class="chat-container">
        <div class="chat-list-area">
          <div class="profile-link-block">
            {{{ Link label="Профиль" page="view-profile" linkClassName="profile-link-title"}}}
          </div>
          <div class="search-input-block">
            {{{ Input
                  placeholder="Поиск"
                  inputContainerClassName="search-input-container"
                  inputClassName="search-input"
            }}}
            {{{ ChatList chatItems=chatList }}}
          </div>
        </div>
        {{{ SelectedCurrentChat currentUser=currentUser messageList=messageList }}}
      </div>
    </main>
    `
  }
}
