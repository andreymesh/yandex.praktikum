import { Block } from "../../core";

interface IHeaderProps {
  label: string;
}

export class Header extends Block {
  constructor(props: IHeaderProps) {
    super(props);
  }

  protected render() {
    const { label } = this.props;
    return `<h2 class="header">${label}</h1>`;
  }
}
