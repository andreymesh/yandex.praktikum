import { Block, IProps } from "../../core";

export interface IChatItemProps {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: string | null;
  last_message_content: string | null;
  last_message_time: string | null;
  onClick: (id: number) => void;
}

export class ChatItem extends Block<IChatItemProps> {
  constructor(props: IProps<IChatItemProps>) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.stopPropagation();
          props.onClick(this.props.id);
        }
      }
    });
  }

  protected render() {
    const { avatar, id, last_message_content, last_message_time, title, unread_count } = this.props;
    return `
      <li class="chat-item-card">
        <div class="chat-item-card-photo-wrapper">
          {{{ Avatar avatarSrc='${avatar || ''}' className="chat-item-card-photo" }}}
        </div>
        <p class="chat-item-card-name" id=${id}>
          ${title}
        </p>
        <p class="chat-item-card-last-messege">
          ${last_message_content || ""}
        </p>
        <time class="chat-item-card-date">
          ${last_message_time || ""}
        </time>
        ${unread_count ? `
        <p class="chat-item-card-counter">
        ${unread_count || ""}
      </p>
        `: ""}
      </li>
    `
  }
}
