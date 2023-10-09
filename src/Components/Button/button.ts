import { Block } from "../../core";

interface IButtonProps {
  type: "primary";
  label: string;
  page: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick ?? (() => { })
    }
  }

  protected render() {
    const { type, label, page } = this.props;
    return `
    <button type="button" class="button button-${type}" ${page ? `page="${page}"` : ""}>
        ${label}
    </button>
    `
  }
}
