import { BASE_RESOURCES_URL } from "../../config";
import { ModalAvatar } from "../ModalAvatar";
import Block from "../../core/Block";
import { modalController } from "../../core/ModalController";
import { IProps } from "../../types/IProps";

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
    const imageSrc = avatarSrc && avatarSrc.trim() !== 'null' ? BASE_RESOURCES_URL + avatarSrc : "";
    const imgClass = imageSrc ? "" : "derfault-avatar";
    const imgClassName = className ? className : "";
    return `
    <div class="avatar-container">
      <div class="photo-container">
        <img ${imageSrc ? `src=${imageSrc}` : ""} class="${imgClassName} ${imgClass}" alt="Фото">
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
