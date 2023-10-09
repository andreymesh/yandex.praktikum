import { Block } from "../../core";
import { IChat } from "../../types";
import DefaultAvatar from "../../assets/icons/default-avatar.svg";

export interface IChatItemProps {
  chat: IChat;
}

export class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super(props)
  }

  protected render(): string {
    const { chat } = this.props as IChatItemProps;
    return `
      <li class="chat-item-card">
        <div class="chat-item-card-photo-wrapper">
          <img src="${chat.avatar ?? DefaultAvatar}" class="chat-item-card-photo" alt="Фото собеседника.">
        </div>
        <p class="chat-item-card-name">
          ${chat.title}
        </p>
        <p class="chat-item-card-last-messege">
          ${chat?.last_message?.content ?? ""}
        </p>
        <time class="chat-item-card-date">
          ${chat?.last_message?.time ?? ""}
        </time>
        <p class="chat-item-card-counter">
          ${chat?.unread_count ?? ""}
        </p>
      </li>
    `
  }
}
