import { Block } from "../../core";
import { loginValidation, mailValidation, nameValidation, phoneNumberValidation } from "../../utils";

export class EditProfileContent extends Block {
  constructor() {
    super({
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
      onSave: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const login = this.refs.login.value();
        const phone = this.refs.phone.value();
        const nickName = this.refs.nickName.value();

        console.log({
          email,
          login,
          first_name,
          second_name,
          phone,
          nickName
        })
      }
    });
  }

  protected render(): string {
    return `
    <div class="edit-profile">
      <form class="edit-profile-form">
        {{{ InputField
          label="Почта" name="email"
          value="pochta@yandex.ru"
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
            value="ivanivanov"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            ref="login"
            validate=validate.login
        }}}
        {{{ InputField
              label="Имя"
              name="first_name"
              value="Иван"
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
            value="Иванов"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            ref="second_name"
            validate=validate.secondName
        }}}
        {{{ InputField
              label="Имя в чате"
              name="nickName"
              value="Иван"
              inputContainerClassName="input-profile-container"
              inputLabelClassName="input-profile-label"
              inputClassName="input-profile-input"
              ref="nickName"
              validate=validate.login
        }}}
        {{{
          InputField
            label="Телефон"
            name="phone"
            value="+7-(909)-967-30-30"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            ref="phone"
            validate=validate.phone
          }}}
          <div class="edit-profile-buttons-panel">
            {{{ Button label="Сохранить" type="primary" onClick=onSave}}}
          </div>
      </form>
    </div>
    `
  }
}
