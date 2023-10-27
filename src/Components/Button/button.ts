import { Block, IProps } from "../../core";

interface IButtonProps {
  type: "primary" | "link" | "close" | "dots" | "paperclip";
  label: string;
  onClick: () => void;
  className?: string;
  isSubmit?: boolean;
}

export class Button extends Block<IButtonProps> {
  constructor(props: IProps<IButtonProps>) {
    super({
      ...props,
      events: {
        click: props.onClick ?? (() => { })
    }});
  }

  protected render() {
    const { isSubmit = false, type, label = "", className = "" } = this.props;
    return `
    <button
      type="${isSubmit ? "submit" : "button"}" 
      class="button ${type ? `button-${type}` : ""} ${className}"
    >
        ${label}
    </button>
    `
  }
}
