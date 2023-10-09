import BackIcon from "../../assets/icons/return.svg";
import DefaultAvatar from "../../assets/icons/default-avatar.svg";
import { Block } from "../../core";
import { IProps } from "../../core/Block";

interface IProfileLayoutProps extends IProps {
  content?: string;
  userName?: string;
  page?: string;
}


export class ProfileLayout extends Block {
  constructor(props: IProfileLayoutProps) {
    super(props);
  }

  protected render(): string {
    const { content, userName, page } = this.props as IProfileLayoutProps;
    return `
      <main class="profile">
        <nav class="return-button">
          {{{ ButtonIcon className="return-button-link" icon="${BackIcon}" ${page ? `page="${page}"` : ""} }}}
        </nav>
        <div class="profile-container">
          <div class="profile-container-header">
          {{{Avatar avatarSrc="${DefaultAvatar}" className="profile-container-avatar"}}}
            <div><span class="profile-container-user-name">${userName}</span></div>
          </div>
          ${content ?? ""}
        </div>
      </main>
    `
  }
}
