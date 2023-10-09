import { Block } from "../../core";

interface IBadgeProps {
  type: 'primary' | 'ready',
  text: string,
}

export class Badge extends Block {
  constructor(props: IBadgeProps) {
    super(props);
  }

  protected render(): string {
    const { type = '', text = '' } = this.props as IBadgeProps;
    return `
          <div class="badge ${type ? "badge-" + type : ""}">
              <span>${text}</span>
          </div>
      `;
  }
}
