import { BASE_URLS } from "../../config";
import { Block, StoreEvents } from "../../core";
import { logOut } from "../../services";
import { IUser } from "../../types";


interface IViewProfileContentProps {
  user?: IUser | null;
  onLogOut: (event: Event) => void;
}

export class ViewProfileContent extends Block<IViewProfileContentProps> {
  constructor() {
    const props = {
      user: window.store.getState().user,
      onLogOut: (event: Event) => {
        event.preventDefault();
        logOut().catch((error) => console.warn(error))
      }
    };

    window.store.on(StoreEvents.Updated, () => {
      this.props.user = window.store.getState().user;
      this.setProps(this.props);
    });
    super({ ...props });
  }

  protected render(): string {
    const { user } = this.props;
    if (!user) return "";
    return`<div class="view-profile">
              <div class="view-profile-form">
                {{{ InputField
                  label="Почта"
                  name="email"
                  value="${user?.email || ""}"
                  inputContainerClassName="input-profile-container"
                  inputLabelClassName="input-profile-label"
                  inputClassName="input-profile-input"
                  disabled=true
                }}}
                {{{
                  InputField
                    label="Логин"
                    name="login"
                    value="${user?.login || ""}"
                    inputContainerClassName="input-profile-container"
                    inputLabelClassName="input-profile-label"
                    inputClassName="input-profile-input"
                    disabled=true
                }}}
                {{{ InputField
                  label="Имя"
                  name="first_name"
                  value="${user?.first_name || ""}"
                  inputContainerClassName="input-profile-container"
                  inputLabelClassName="input-profile-label"
                  inputClassName="input-profile-input"
                  disabled=true
                }}}
                {{{
                  InputField
                  label="Фамилия"
                  name="second_name"
                  value="${user?.second_name || ""}"
                  inputContainerClassName="input-profile-container"
                  inputLabelClassName="input-profile-label"
                  inputClassName="input-profile-input"
                  disabled=true
                }}}
                {{{ InputField
                  label="Имя в чате"
                  name="display_name"
                  value="${user?.display_name || ""}"
                  inputContainerClassName="input-profile-container"
                  inputLabelClassName="input-profile-label"
                  inputClassName="input-profile-input"
                  disabled=true
                }}}
                {{{
                  InputField
                    label="Телефон"
                    name="phone"
                    value="${user?.phone || ""}"
                    inputContainerClassName="input-profile-container"
                    inputLabelClassName="input-profile-label"
                    inputClassName="input-profile-input"
                    disabled=true
                  }}}
                <div class="view-profile-buttons-panel">
                  {{{ Link label="Изменить данные" className="view-profile-change-data-link" link="${BASE_URLS.editProfileData}" }}}
                  {{{ Link label="Изменить пароль" className="view-profile-change-data-link" link="${BASE_URLS.editProfilePassword}" }}}
                  {{{ Button label="Выйти" className="view-profile-sign-out" onClick=onLogOut}}}
                </div>
              </div>
            </div>
    `
  }
}
