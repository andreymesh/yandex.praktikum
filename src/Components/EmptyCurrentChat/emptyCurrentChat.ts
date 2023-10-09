import { Block } from "../../core";

interface IEmptyCurrentChatProps {
  title: string;
}

export class EmptyCurrentChat extends Block {
  constructor(props:IEmptyCurrentChatProps) {
    super(props);
  }

  protected render(): string {
    const { title } = this.props as IEmptyCurrentChatProps;
    return `
    <div class="empty-current-chat">
      <span class="empty-current-chat-title">
        ${title ?? ""}
      </span>
    </div>`
  }
}
