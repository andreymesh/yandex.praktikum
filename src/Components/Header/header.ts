import { Block, IProps } from "../../core";

interface IHeaderProps {
  label: string;
}

export class Header extends Block<IHeaderProps> {
  constructor(props: IProps<IHeaderProps>) {
    super({ ...props });
  }

  protected render() {
    const { label } = this.props;
    return `<h2 class="header">${label}</h1>`;
  }
}
