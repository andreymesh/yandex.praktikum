import { Block } from "../../core";
import { passwordValidation } from "../../utils";

export class ChangePasswordContent extends Block {
  constructor() {
    super({
      validate: {
        password: (value: string) => passwordValidation(value)
          ? "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра"
          : ""
      },
      onSave: (event: Event) => {
        event.preventDefault();
        const oldPassword = this.refs.oldPassword.value();
        const newPassword = this.refs.newPassword.value();
        const repeatNewPassword = this.refs.repeatNewPassword.value();

        console.log({
          oldPassword,
          newPassword,
          repeatNewPassword
        })
      }
    });
  }

  protected render(): string {
    return `
    <div class="change-profile">
      <form class="change-profile-form">
        {{{ InputField
              label="Старый пароль"
              name="oldPassword"
              value="1234"
              inputContainerClassName="input-profile-container"
              inputLabelClassName="input-profile-label"
              inputClassName="input-profile-input"
              type="password"
              ref="oldPassword"
              validate=validate.password
        }}}
        {{{ InputField
              label="Новый пароль"
              name="newPassword"
              value="5678"
              inputContainerClassName="input-profile-container"
              inputLabelClassName="input-profile-label"
              inputClassName="input-profile-input"
              type="password"
              ref="newPassword"
              validate=validate.password
          }}}
          {{{ InputField
              label="Повторите новый пароль"
              name="repeatNewPassword"
              value="5678"
              inputContainerClassName="input-profile-container"
              inputLabelClassName="input-profile-label"
              inputClassName="input-profile-input"
              type="password"
              ref="repeatNewPassword"
              validate=validate.password
            }}}
        <div class="change-profile-buttons-panel">
          {{{ Button label="Сохранить" buttonType="submit" type="primary" onClick=onSave }}}
        </div>
      </form>
    </div>
    `
  }
}
