import { Block } from "../../core";

interface IErrorProps {
  code: string;
  title: string;
}

export class Error extends Block {
  constructor(props: IErrorProps) {
    super(props);
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
        {{{ Link label="Назад к чатам" page="chat" linkClassName="link"}}}
      </main>
    `
  }
}
