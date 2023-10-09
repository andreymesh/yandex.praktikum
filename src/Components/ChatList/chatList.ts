import { ChatItem } from "..";
import { Block } from "../../core";
import { IChat } from "../../types";

interface IChatListProps {
  chatItems: IChat[];
}

export class ChatList extends Block {
  constructor(props: IChatListProps) {
    super(props)
  }

  renderChats(chatItems?: IChat[]) {
    return chatItems?.map((chat) => {
      const chatBlock = new ChatItem({ chat: chat }).transformToString();
      return chatBlock
    })?.join("") ?? "";
  }

  protected render(): string {
    const { chatItems } = this.props as IChatListProps;
    const chats = this.renderChats(chatItems);
    return `
      <div class="chat-list">
        ${chats}
      </div>
    `
  }
}
