import { BASE_URLS } from "../../config";
import { Block, IProps } from "../../core";

interface IErrorProps {
  code: string;
  title: string;
}

export class Error extends Block<IErrorProps> {
  constructor(props: IProps<IErrorProps>) {
    super({ ...props });
  }

  protected render(): string {
    const { code, title } = this.props;
    return `
      <main class="error-page">
        <div class="error-page-code">
          <span>${code}</span>
        </div>
        <div class="error-page-title">
          <span>${title}</span>
        </div>
        {{{ Link label="Назад к чатам" link="${BASE_URLS.chats}" className="link"}}}
      </main>
    `
  }
}
