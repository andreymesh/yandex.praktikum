import { Block } from "../../core";
import { loginValidation, passwordValidation } from "../../utils";

export class Login extends Block {
  constructor() {
    super({
      validate: {
        login: (value: string) => loginValidation(value)
          ? "Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание"
          : "",
        password: (value: string) => passwordValidation(value)
          ? "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра"
          : ""
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();

        console.log({
          login,
          password
        })
      }
    });
  }

  protected render() {
    return `
    <main class="login-container">
      <form class="login-form">
        {{{ Header label="Вход" }}}
        {{{ InputField
              placeholder="Логин"
              name="login"
              inputContainerClassName="input-container"
              inputClassName="input"
              ref="login"
              validate=validate.login
        }}}
        {{{ InputField
            placeholder="Пароль"
            name="password"
            type="password"
            inputContainerClassName="input-container"
            inputClassName="input"
            ref="password"
            validate=validate.password
        }}}
        {{{ Button label="Авторизоваться" type="primary" onClick=onLogin}}}
        {{{ Link label="Нет аккаунта?" page="registration" linkClassName="link"}}}
      </form>
    </main>
    `
  }
}
