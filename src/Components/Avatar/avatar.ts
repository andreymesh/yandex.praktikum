import { Block, IProps, modalController } from "../../core";
import DefaultAvatar from "../../assets/icons/default-avatar.svg";
import { BASE_RESOURCES_URL } from "../../config";
import { ModalAvatar } from "..";

interface IAvatarProps {
  avatarSrc?: string;
  className?: string;
  editAvatar?: boolean;
}

export class Avatar extends Block<IAvatarProps> {
  constructor(props: IProps<IAvatarProps>) {
    props.events = props.editAvatar ? {
      click: () => {
        modalController.addModal((new ModalAvatar({
          oldAvatar: window.store.getState().user?.avatar || '',
          type: 'user'
        })));
        modalController.openModal();
      }
    } : undefined;
    super(props);
  }

  protected render(): string {
    const { avatarSrc, className, editAvatar = false } = this.props;
    const imageSrc = avatarSrc && avatarSrc.trim() !== 'null' ? BASE_RESOURCES_URL + avatarSrc : DefaultAvatar;
    return `
    <div class="avatar-container">
      <div class="photo-container">
        <img ${imageSrc ? `src=${imageSrc}` : ""} ${className ? `class=${className}` : ""} alt="Фото">
        ${editAvatar ? `
              <div class="photo-overlay">
                <div class="overlay-text">Поменять аватар</div>
              </div>`
          : ""}
      </div>
    </div>
  `
  }
}
