import { Block, IProps } from "../../core";

interface IBadgeProps {
  type: 'primary' | 'ready',
  text: string,
}

export class Badge extends Block<IBadgeProps> {
  constructor(props: IProps<IBadgeProps>) {
    super({ ...props });
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
