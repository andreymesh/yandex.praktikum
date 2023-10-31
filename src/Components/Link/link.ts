import Block from "../../core/Block";
import Router from "../../core/Router";
import { IProps } from "../../types/IProps";

interface ILinkProps {
  label: string;
  className?: string;
  page?: string;
  link?: string;
  onClick: (event: Event) => void;
}

export class Link extends Block<ILinkProps> {
  constructor(props: IProps<ILinkProps>) {
    super({
        ...props,
        events: {
            click: (event: Event) => {
            if (!this.props.onClick) Router.getRouter().go(props?.link || '/');
            if (this.props.onClick) {
              this.props.onClick(event);
            }
          }
      }
    })
  }

  protected render(): string {
    const { label, className = "", page } = this.props;
    return `
    <a ${className ? `class=${className}` : ""}  ${page ? `page="${page}"` : ""} >
     ${label}
    </a>
    `
  }
}
