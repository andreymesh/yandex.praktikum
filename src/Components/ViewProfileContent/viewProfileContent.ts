import { Block } from "../../core";

export class ViewProfileContent extends Block {
  constructor() {
    super()
  }

  protected render(): string {
    return `
    <div class="view-profile">
      <div class="view-profile-form">
        {{{ InputField
          label="Почта" name="email"
          value="pochta@yandex.ru"
          inputContainerClassName="input-profile-container"
          inputLabelClassName="input-profile-label"
          inputClassName="input-profile-input"
          disabled=true
        }}}
        {{{
          InputField
            label="Логин"
            name="login"
            value="ivanivanov"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            disabled=true
        }}}
        {{{ InputField
          label="Имя"
          name="first_name"
          value="Иван"
          inputContainerClassName="input-profile-container"
          inputLabelClassName="input-profile-label"
          inputClassName="input-profile-input"
          disabled=true
        }}}
        {{{
          InputField
          label="Фамилия"
          name="second_name"
          value="Иванов"
          inputContainerClassName="input-profile-container"
          inputLabelClassName="input-profile-label"
          inputClassName="input-profile-input"
           disabled=true
        }}}
        {{{ InputField
           label="Имя в чате"
           name="nickName"
           value="Иван"
           inputContainerClassName="input-profile-container"
           inputLabelClassName="input-profile-label"
           inputClassName="input-profile-input"
           disabled=true
        }}}
        {{{
          InputField
            label="Телефон"
            name="phone"
            value="+7-(909)-967-30-30"
            inputContainerClassName="input-profile-container"
            inputLabelClassName="input-profile-label"
            inputClassName="input-profile-input"
            disabled=true
          }}}
        <div class="view-profile-buttons-panel">
          {{{ Link label="Изменить данные" linkClassName="view-profile-change-data-link" page="edit-profile"}}}
          {{{ Link label="Изменить пароль" linkClassName="view-profile-change-data-link" page="change-password"}}}
          {{{ Link label="Выйти" linkClassName="view-profile-sign-out" page="login"}}}
        </div>
      </div>
    </div>
    `
  }
}
