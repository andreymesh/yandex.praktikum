import { Block } from "../../core";
import { loginValidation, mailValidation, nameValidation, passwordValidation, phoneNumberValidation } from "../../utils";

export class Registration extends Block {
  constructor() {
    super({
      validate: {
        login: (value: string) => loginValidation(value)
          ? "Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание"
          : "",
        password: (value: string) => passwordValidation(value)
          ? "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра"
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
      registrationHandler: (event: Event) => {
        event.preventDefault();
        const email = this.refs.email.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const login = this.refs.login.value();
        const phone = this.refs.phone.value();
        const password = this.refs.password.value();

        console.log({
          email,
          login,
          first_name,
          second_name,
          phone,
          password
        })
      }
    });
  }

  protected render() {
    return `
    <main class="login-container">
      <form class="login-form">
          {{{ Header label="Регистрация" }}}
          {{{ InputField
                label="Почта"
                name="email"
                inputContainerClassName="input-container"
                inputClassName="input"
                inputLabelClassName="input-label"
                ref="email"
                validate=validate.email
          }}}
          {{{ InputField
                label="Логин"
                name="login"
                inputContainerClassName="input-container"
                inputClassName="input"
                inputLabelClassName="input-label"
                ref="login"
                validate=validate.login
          }}}
          {{{ InputField
                label="Имя"
                name="first_name"
                inputContainerClassName="input-container"
                inputClassName="input"
                inputLabelClassName="input-label"
                ref="first_name"
                validate=validate.firstName
          }}}
          {{{ InputField
              label="Фамилия"
              name="second_name"
              inputContainerClassName="input-container"
              inputClassName="input"
              inputLabelClassName="input-label"
              ref="second_name"
              validate=validate.secondName
          }}}
          {{{ InputField
              label="Телефон"
              name="phone"
              inputContainerClassName="input-container"
              inputClassName="input"
              inputLabelClassName="input-label"
              ref="phone"
              validate=validate.phone
          }}}
          {{{ InputField
            label="Пароль"
            name="password"
            type="password"
            inputContainerClassName="input-container"
            inputClassName="input"
            inputLabelClassName="input-label"
            ref="password"
            validate=validate.password
        }}}
        {{{ InputField
              label="Пароль (еще раз)"
              name="password"
              type="password"
              inputContainerClassName="input-container"
              inputClassName="input"
              inputLabelClassName="input-label"
              ref="password"
              validate=validate.password
        }}}
        {{{ Button label="Зарегистрироваться" type="primary" onClick=registrationHandler }}}
        {{{ Link label="Войти" page="login" linkClassName="link"}}}
      </form>
    </main>
    `
  }
}
