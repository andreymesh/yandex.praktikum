import { Block } from "../../core";
import { updateUserProfile } from "../../services";
import { IUser } from "../../types";
import { loginValidation, mailValidation, nameValidation, phoneNumberValidation } from "../../utils";

interface IEditProfileContentProps {
  user?: IUser | null;
  validate?: Record<string, (value: string) => string>;
}

export class EditProfileContent extends Block<IEditProfileContentProps> {
  constructor() {
    const onSave = async (event: Event) => {
      event.preventDefault();
      const email = this.refs.email.value();
      const first_name = this.refs.first_name.value();
      const second_name = this.refs.second_name.value();
      const login = this.refs.login.value();
      const phone = this.refs.phone.value();
      const display_name = this.refs.display_name.value();

      const data = {
        email,
        login,
        first_name,
        second_name,
        phone,
        display_name
      }
      if (login && first_name && second_name && phone && email) {
        try {
            await updateUserProfile(data);
        } catch (e) {
            console.error(e)
        }
    }
    }
    const props = {
      user: window.store.getState().user,
      validate: {
        login: (value: string) => loginValidation(value)
          ? "Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание"
          : "",
        email: (value: string) => mailValidation(value)
          ? "Почта должна быть написана на латинице, допускаются цифры и спецсимволы." : "",
        firstName: (value: string) => nameValidation(value)
          ? "Имя должно быть написано на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов" : "",
        secondName: (value: string) => nameValidation(value)
          ? "Фамилия должна быть написана на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов" : "",
        phone: (value?: string) => phoneNumberValidation(value)
          ? "Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса." : ""
      },
      onSave: onSave,
      events: {
        submit: (event: Event) => {
          onSave(event)
        }
      },
    };


    super({ ...props });
  }

  protected render() {
    const { user } = this.props;
    if (!user) return "";
    return `
    <div class="edit-profile">
      <form class="edit-profile-form">
        {{{ InputField
          label="Почта"
          name="email"
          value="${user?.email || ""}"
          inputContainerClassName="input-profile-container"
          inputLabelClassName="input-profile-label"
          inputClassName="input-profile-input"
          ref="email"
          validate=validate.email
        }}}
        {{{
          InputField
            label="Логин"
            name="login"
            value="${user?.login || ""}"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            ref="login"
            validate=validate.login
        }}}
        {{{ InputField
              label="Имя"
              name="first_name"
              value="${user?.first_name || ""}"
              inputContainerClassName="input-profile-container"
              inputLabelClassName="input-profile-label"
              inputClassName="input-profile-input"
              ref="first_name"
              validate=validate.firstName
        }}}
        {{{
          InputField
            label="Фамилия"
            name="second_name"
            value="${user?.second_name || ""}"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            ref="second_name"
            validate=validate.secondName
        }}}
        {{{ InputField
              label="Имя в чате"
              name="display_name"
              value="${user?.display_name || ""}"
              inputContainerClassName="input-profile-container"
              inputLabelClassName="input-profile-label"
              inputClassName="input-profile-input"
              ref="display_name"
              validate=validate.login
        }}}
        {{{
          InputField
            label="Телефон"
            name="phone"
            value="${user?.phone || ""}"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            ref="phone"
            validate=validate.phone
          }}}
          <div class="edit-profile-buttons-panel">
            {{{ Button label="Сохранить" type="primary" onClick=onSave isSubmit=true }}}
          </div>
      </form>
    </div>
    `
  }
}
