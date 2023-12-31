import { Block, IProps } from "../../core";

interface IEmptyCurrentChatProps {
  title: string;
}

export class EmptyCurrentChat extends Block<IEmptyCurrentChatProps> {
  constructor(props: IProps<IEmptyCurrentChatProps>) {
    super({ ...props });
  }

  protected render(): string {
    const { title } = this.props;
    return `
    <div class="empty-current-chat">
      <span class="empty-current-chat-title">
        ${title ?? ""}
      </span>
    </div>`
  }
}
