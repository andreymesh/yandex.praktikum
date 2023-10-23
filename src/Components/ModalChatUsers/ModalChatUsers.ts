import { UserItem } from "..";
import { Block, IProps, modalController } from "../../core";
import { addChatUser, deleteChatUsers, searchUsersByLogin, setStateCurrentChat } from "../../services";
import { IUser } from "../../types";
import { loginValidation, showModalAlert } from "../../utils";

interface IModalChatUsersProps {
  okClick?: (result: string) => void;
  okInputClick?: (event: Event) => void;
  cancelClick?: () => void;
  ref?: string;
  type: 'add' | 'delete';
  users: IUser[] | null;
}

export class ModalChatUsers extends Block<IModalChatUsersProps> {
  constructor(props: IProps<IModalChatUsersProps>) {
      props.okInputClick = (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          if (this.props.type === 'add') {
              const input = this.refs.modal.getRefs().input.value();
              if (!input) {
                  return;
              }
              searchUsersByLogin(input).then((users) => {
                  if (!users || users.length === 0) {
                      showModalAlert('Не найден пользователь')
                  }
                  this.props.users = users;
                  this.setProps(this.props)
              }).catch(error => console.warn(error))
          } else modalController.closeModal();

      };
      props.cancelClick = () => {
          modalController.closeModal();
      };


      super({
          ...props,
          validate: {
            login: (value: string) => loginValidation(value)
              ? "Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание"
              : "",
          },
          events: {
              click: (e: Event) => {
                  e.stopPropagation();
                  const id = (e.target as HTMLElement).id;
                  const chat = window.store.getState().currentChat;
                  if (chat && id && props.type === 'add') {
                      addChatUser({
                          users: [Number(id)],
                          chatId: chat.id
                      }).then(() => {
                          setStateCurrentChat(chat).then(() => modalController.closeModal());
                      })
                          .catch((error) => console.warn(error));
                  }
                  if (props.type === 'delete' && chat) {
                      deleteChatUsers({
                          users: [Number(id)],
                          chatId: chat.id
                      }).then(() => {
                          setStateCurrentChat(chat).then(() => modalController.closeModal());
                      }).catch((error) => console.warn(error));
                  }
              }
          }
      });
    }

    getChildren() {
        const { users, type } = this.props;
        const result = users && users.length > 1 ? users.reduce((sum, user) => {
            const item = new UserItem({user: user, icon: type === 'add' ? 'plus' : 'delete'});
            return sum + item.renderForList();
        }, '') : '';
        return (
            `
                ${type === 'add' ?
                `{{{ InputField
                        label='Логин'
                        type='text'
                        name='input'
                        validate=validate.login
                        ref='input'
                        inputContainerClassName='input-container'
                        inputClassName='input'
                        inputLabelClassName='input-label'
                }}}` : ''}
                 
                <div class='modal-users'>${result}</div>                        
            `
        )
    }

    
    protected render(): string {
        return (`
                 {{{  Modal 
                         caption='${this.props.type === 'add' ? 'Добавить пользователя' : 'Удалить пользователя'}' 
                         okText='${this.props.type === 'add' ? 'Поиск' : 'OK'}'
                         cancelText='${this.props.type === 'add' ? 'Закрыть' : ''}'
                         okClick=okInputClick 
                         cancelClick=cancelClick 
                         children="${this.getChildren()}" 
                         ref='modal'
                 }}}
        `)
    }
}
