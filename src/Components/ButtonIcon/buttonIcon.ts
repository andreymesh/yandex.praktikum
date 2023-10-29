import Block from "../../core/Block";
import { IProps } from "../../types/IProps";

interface IButtonIconProps {
  className?: string;
  icon?: string;
  linkText?: string;
  page?: string;
  onClick?: () => void;
}

export class ButtonIcon extends Block<IButtonIconProps> {
  constructor(props: IProps<IButtonIconProps>) {
    super({
      ...props,
      events: {
        click: props.onClick ?? (() => { })
      }
    });
  }

  protected render(): string {
    const { className, icon, linkText, page } = this.props;
    return `
      <button ${className ? `class=${className}` : ""}>
        <div class="button-icon-content">
          <img 
            class="button-icon"
            ${icon ? `src=${icon}` : ""}
            ${linkText ? `alt=${linkText}` : ""} 
            ${page ? `page=${page}` : ""}
          />
        </div>
      </button>
    `
  }
}
