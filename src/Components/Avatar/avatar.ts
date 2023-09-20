import { Block } from "../../core";

interface IAvatarProps {
  avatarSrc?: string;
  className?: string;
}

export class Avatar extends Block {
  constructor(props: IAvatarProps) {
    super(props);
  }

  protected render(): string {
    const { avatarSrc, className } = this.props;
    return `
    <div class="avatar-container">
      <div class="photo-container">
        <img ${avatarSrc ? `src=${avatarSrc}` : ""} ${className ? `class=${className}` : ""} alt="Фото">
        <div class="photo-overlay">
          <div class="overlay-text">Поменять аватар</div>
        </div>
      </div>
    </div>
  `
  }
}
