import { Block } from "../../core";

interface IButtonIconProps {
  className?: string;
  icon?: string;
  linkText?: string;
  page?: string;
  onClick?: () => void;
}

export class ButtonIcon extends Block {
  constructor(props: IButtonIconProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick ?? (() => { })
    }
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
