import { BASE_URLS } from "../../config";
import Block from "../../core/Block";
import { StoreEvents } from "../../core/Store";
import { signIn } from "../../services/auth";
import { IUser } from "../../types/IUser";
import { loginValidation, passwordValidation } from "../../utils/validation";

export interface ILoginPageProps {
  onLogin: (event: Event) => void;
  currentUser?: IUser | null;
}

export class Login extends Block<ILoginPageProps> {
  constructor() {
    const onLogin = (event: Event) => {
      event.preventDefault();
      const login = this.refs.login.value();
      const password = this.refs.password.value();

      if (!login || !password) {
        return;

      }

      signIn({ login, password }).catch((error) => console.error('login', error));
    };

    const props = {
      validate: {
        login: (value: string) => loginValidation(value)
          ? "Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание"
          : "",
        password: (value: string) => passwordValidation(value)
          ? "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра"
          : ""
      },
      onLogin: onLogin,
      events: {
        submit: (event: Event) => {
          onLogin(event);
        }
      },
    };
    window.store.on(StoreEvents.Updated, () => {
      this.props.currentUser = window.store.getState()?.user;
      this.setProps(this.props);
    });
    super({ ...props });
  }

  protected render() {
    const { currentUser } = this.props;
    if (currentUser === undefined) {
      return `<main class="login-container">{{{ Loader }}}</main>`;
    }
    return `<main class="login-container">
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
                {{{ Button label="Авторизоваться" type="primary" onClick=onLogin isSubmit=true }}}
                {{{ Link label="Нет аккаунта?" link="${BASE_URLS.registration}" className="link"}}}
              </form>
            </main>
    `
  }
}
