import Block from "../../core/Block";
import { updateUserPassword } from "../../services/userSettings";
import { showAlert } from "../../utils/showAlert";
import { passwordValidation } from "../../utils/validation";

export class ChangePasswordContent extends Block {
  constructor() {

    const onSave = async (event: Event) => {
      event.preventDefault();
      const oldPassword = this.refs.oldPassword.value();
      const newPassword = this.refs.newPassword.value();
      const repeatNewPassword = this.refs.repeatNewPassword.value();

      if (newPassword !== repeatNewPassword) showAlert('Введите кооректно повтор нового пароля!');
      if (oldPassword && newPassword && newPassword === repeatNewPassword) {

          try {
            await updateUserPassword({ oldPassword, newPassword });
          } catch (e) {
              console.warn(e)
          }
      }
    };

    const props = {
      validate: {
        password: (value: string) => passwordValidation(value)
          ? "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра"
          : ""
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

  protected render(): string {
    return `
    <div class="change-profile">
      <form class="change-profile-form">
        {{{ InputField
              label="Старый пароль"
              name="oldPassword"
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
