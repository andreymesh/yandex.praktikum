import BackIcon from "../../assets/icons/return.svg";
import { Block, IProps, Router, StoreEvents } from "../../core";
import { IUser } from "../../types";

interface IProfileLayoutProps {
  content?: string;
  user?: IUser | null;
  backOnClick?: () => void;
  editAvatar?: boolean;
}


export class ProfileLayout extends Block<IProfileLayoutProps> {
  constructor(props: IProps<IProfileLayoutProps>) {

    props.user = window.store.getState().user;
    props.backOnClick = () => {
      Router.getRouter().back();
    }
    super(props);
    
    window.store.on(StoreEvents.Updated, () => {
      this.props.user = window.store.getState().user;
      this.setProps(this.props);
    });
  }

  protected render(): string {
    const { content, user, editAvatar = false } = this.props;
    if (!user) return '';
    const { avatar = '', first_name = '', second_name = '' } = user;
    return `
      <main class="profile">
        <nav class="return-button">
          {{{ ButtonIcon className="return-button-link" icon="${BackIcon}" onClick=backOnClick }}}
        </nav>
        <div class="profile-container">
          <div class="profile-container-header">
            {{{Avatar avatarSrc="${avatar}" className="profile-container-avatar" editAvatar=${editAvatar} }}}
            <h2 class="profile-container-user-name">${first_name} ${second_name}</h2>
          </div>
          ${user ?
              `<div>
                  ${content}
              </div>` : ''
            }
        </div>
      </main>
    `
  }
}
