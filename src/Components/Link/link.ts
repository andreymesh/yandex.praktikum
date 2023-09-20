import { Block } from "../../core";

interface ILinkProps {
  label: string;
  linkClassName?: string;
  page?: string;
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super(props)
  }

  protected render(): string {
    const { label, linkClassName, page } = this.props
    return `
    <a ${linkClassName ? `class=${linkClassName}` : ""}  ${page ? `page="${page}"` : ""} >
     ${label}
    </a>
    `
  }
}
